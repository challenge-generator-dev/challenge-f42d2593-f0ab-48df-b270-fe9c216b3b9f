import { Product } from '../../domain/models/Product';
import { ProductNotFoundException } from '../../domain/exceptions/ProductNotFoundException';
import { DuplicateProductException } from '../../domain/exceptions/DuplicateProductException';
import mongoose from 'mongoose';

export class ProductRepository {
  private readonly collectionName = 'products';
  private products: Map<string, Product> = new Map();
  private nameIndex: Map<string, string> = new Map();
  private idCounter = 0;

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    const sampleProducts = [
      { id: '1', name: 'Cuenta Corriente', price: 0, stock: 999999, category: 'CUENTA', status: 'ACTIVE', description: 'Cuenta corriente bancaria estándar', sku: 'CC-001' },
      { id: '2', name: 'Tarjeta de Crédito Gold', price: 1500, stock: 100, category: 'TARJETA', status: 'ACTIVE', description: 'Tarjeta de crédito con beneficios premium', sku: 'TC-GOLD-001' },
      { id: '3', name: 'Préstamo Personal', price: 5000, stock: 50, category: 'PRESTAMO', status: 'ACTIVE', description: 'Préstamo personal para necesidades inmediatas', sku: 'PR-001' },
      { id: '4', name: 'Fondo de Inversión', price: 10000, stock: 999999, category: 'FONDO', status: 'ACTIVE', description: 'Fondo de inversión de alto rendimiento', sku: 'FI-001' },
      { id: '5', name: 'Seguro de Vida', price: 2500, stock: 200, category: 'SEGURO', status: 'ACTIVE', description: 'Seguro de vida con cobertura completa', sku: 'SV-001' }
    ];

    sampleProducts.forEach(data => {
      const product = new Product(data);
      this.products.set(product.id, product);
      this.nameIndex.set(product.name.toLowerCase(), product.id);
    });
    
    this.idCounter = sampleProducts.length;
  }

  async findAll(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isActive());
  }

  async findById(id: string): Promise<Product> {
    const product = this.products.get(id);
    if (!product || !product.isActive()) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const id = this.nameIndex.get(name.toLowerCase());
    if (!id) return null;
    return this.products.get(id) || null;
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const existingByName = await this.findByName(productData.name || '');
    if (existingByName) {
      throw new DuplicateProductException(productData.name || '');
    }

    const newProduct = new Product({
      ...productData,
      id: String(++this.idCounter),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    this.products.set(newProduct.id, newProduct);
    this.nameIndex.set(newProduct.name.toLowerCase(), newProduct.id);
    
    return newProduct;
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    const existing = await this.findById(id);
    
    if (productData.name && productData.name.toLowerCase() !== existing.name.toLowerCase()) {
      const nameExists = await this.findByName(productData.name);
      if (nameExists && nameExists.id !== id) {
        throw new DuplicateProductException(productData.name);
      }
      this.nameIndex.delete(existing.name.toLowerCase());
      this.nameIndex.set(productData.name.toLowerCase(), id);
    }

    const updated = new Product({
      ...existing,
      ...productData,
      id: existing.id,
      updatedAt: new Date()
    });

    this.products.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    product.status = 'INACTIVE' as any;
    this.products.set(id, product);
    this.nameIndex.delete(product.name.toLowerCase());
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findById(id);
    
    if (quantity > 0) {
      product.increaseStock(quantity);
    } else {
      product.decreaseStock(Math.abs(quantity));
    }

    this.products.set(id, product);
    return product;
  }

  async count(): Promise<number> {
    return Array.from(this.products.values()).filter(p => p.isActive()).length;
  }

  async existsById(id: string): Promise<boolean> {
    const product = this.products.get(id);
    return !!product && product.isActive();
  }

  async existsByName(name: string, excludeId?: string): Promise<boolean> {
    const id = this.nameIndex.get(name.toLowerCase());
    if (!id) return false;
    if (excludeId && id === excludeId) return false;
    return true;
  }
}