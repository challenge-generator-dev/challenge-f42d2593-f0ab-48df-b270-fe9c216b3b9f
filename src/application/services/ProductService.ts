import { Product } from '../../domain/models/Product';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';
import { ProductNotFoundException } from '../../domain/exceptions/ProductNotFoundException';
import { DuplicateProductException } from '../../domain/exceptions/DuplicateProductException';
import { ValidationException } from '../../domain/exceptions/ValidationException';
import { 
  CreateProductValidation, 
  UpdateProductValidation, 
  StockUpdateValidation,
  ProductIdValidation,
  PaginationValidation,
  validateProductData
} from '../../domain/validators/ProductValidator';

export interface CreateProductDTO {
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  sku?: string;
}

export interface UpdateProductDTO {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
  description?: string;
  sku?: string;
  status?: string;
}

export interface StockUpdateDTO {
  quantity: number;
  operation: 'ADD' | 'SUBTRACT' | 'SET';
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductListResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class ProductService {
  private readonly productRepository: ProductRepository;
  private readonly defaultPageSize = 20;
  private readonly maxPageSize = 100;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(pagination: PaginationParams): Promise<ProductListResult> {
    const page = Math.max(1, pagination.page || 1);
    const limit = Math.min(this.maxPageSize, Math.max(1, pagination.limit || this.defaultPageSize));
    
    const allProducts = await this.productRepository.findAll();
    const sortedProducts = this.sortProducts(allProducts, pagination.sortBy, pagination.sortOrder);
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total: allProducts.length,
      page,
      limit,
      totalPages: Math.ceil(allProducts.length / limit)
    };
  }

  private sortProducts(products: Product[], sortBy?: string, sortOrder?: 'asc' | 'desc'): Product[] {
    const sorted = [...products];
    const field = sortBy || 'name';
    const order = sortOrder === 'desc' ? -1 : 1;
    
    sorted.sort((a, b) => {
      const aVal = (a as any)[field];
      const bVal = (b as any)[field];
      
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order * aVal.localeCompare(bVal);
      }
      
      return order * (aVal < bVal ? -1 : 1);
    });
    
    return sorted;
  }

  async getProductById(id: string): Promise<Product> {
    if (!id || id.trim() === '') {
      throw new ValidationException('El ID del producto es requerido', ['El ID no puede estar vacío']);
    }
    
    try {
      return await this.productRepository.findById(id);
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw error;
      }
      throw new ValidationException('Producto no encontrado', [(error as Error).message]);
    }
  }

  async createProduct(data: CreateProductDTO): Promise<Product> {
    const validationErrors = validateProductData(data);
    if (validationErrors.length > 0) {
      throw new ValidationException('Error de validación al crear producto', validationErrors);
    }

    const exists = await this.productRepository.existsByName(data.name);
    if (exists) {
      throw new DuplicateProductException(data.name);
    }

    const productData = {
      name: data.name,
      price: data.price,
      stock: data.stock,
      category: data.category,
      description: data.description || '',
      sku: data.sku || this.generateSKU(data.name, data.category),
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return await this.productRepository.create(productData);
  }

  private generateSKU(name: string, category: string): string {
    const prefix = category.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase();
    const namePart = name.replace(/[^A-Z0-9]/g, '').substring(0, 4).toUpperCase();
    return `${prefix}-${namePart}-${timestamp}`;
  }

  async updateProduct(id: string, data: UpdateProductDTO): Promise<Product> {
    const existing = await this.productRepository.findById(id);
    
    if (data.name && data.name.toLowerCase() !== existing.name.toLowerCase()) {
      const nameExists = await this.productRepository.existsByName(data.name, id);
      if (nameExists) {
        throw new DuplicateProductException(data.name);
      }
    }

    if (data.price !== undefined && data.price < 0) {
      throw new ValidationException('El precio no puede ser negativo', ['price debe ser >= 0']);
    }

    if (data.stock !== undefined && data.stock < 0) {
      throw new ValidationException('El stock no puede ser negativo', ['stock debe ser >= 0']);
    }

    const updateData = {
      ...data,
      updatedAt: new Date()
    };

    return await this.productRepository.update(id, updateData);
  }

  async deleteProduct(id: string): Promise<void> {
    const exists = await this.productRepository.existsById(id);
    if (!exists) {
      throw new ProductNotFoundException(id);
    }
    
    await this.productRepository.delete(id);
  }

  async updateStock(id: string, data: StockUpdateDTO): Promise<Product> {
    const product = await this.productRepository.findById(id);
    
    if (data.operation === 'SET') {
      const diff = data.quantity - product.stock;
      if (diff > 0) {
        product.increaseStock(diff);
      } else if (diff < 0) {
        product.decreaseStock(Math.abs(diff));
      }
    } else if (data.operation === 'ADD') {
      product.increaseStock(data.quantity);
    } else if (data.operation === 'SUBTRACT') {
      if (!product.canBeSold(data.quantity)) {
        throw new ValidationException(
          'Stock insuficiente',
          [`Stock actual: ${product.stock}, solicitado: ${data.quantity}`]
        );
      }
      product.decreaseStock(data.quantity);
    }

    return await this.productRepository.update(id, { stock: product.stock });
  }

  async getProductStats(): Promise<{
    total: number;
    active: number;
    lowStock: number;
    outOfStock: number;
    byCategory: Record<string, number>;
  }> {
    const allProducts = await this.productRepository.findAll();
    
    const stats = {
      total: allProducts.length,
      active: 0,
      lowStock: 0,
      outOfStock: 0,
      byCategory: {} as Record<string, number>
    };

    for (const product of allProducts) {
      if (product.isActive()) stats.active++;
      if (product.isLowStock()) stats.lowStock++;
      if (!product.hasStock()) stats.outOfStock++;
      
      const category = product.category || 'UNKNOWN';
      stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
    }

    return stats;
  }
}