export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISCONTINUED = 'DISCONTINUED',
}

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku?: string;
  status: ProductStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product implements IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku?: string;
  status: ProductStatus;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<IProduct>) {
    this.id = data.id;
    this.name = data.name || '';
    this.description = data.description || '';
    this.price = data.price || 0;
    this.stock = data.stock || 0;
    this.category = data.category || '';
    this.sku = data.sku;
    this.status = data.status || ProductStatus.ACTIVE;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static fromDatabase(doc: any): Product {
    return new Product({
      id: doc._id?.toString() || doc.id,
      name: doc.name,
      description: doc.description,
      price: Number(doc.price),
      stock: Number(doc.stock),
      category: doc.category,
      sku: doc.sku,
      status: doc.status || ProductStatus.ACTIVE,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      category: this.category,
      sku: this.sku,
      status: this.status,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    };
  }

  isActive(): boolean {
    return this.status === ProductStatus.ACTIVE;
  }

  hasStock(): boolean {
    return this.stock > 0;
  }

  isLowStock(threshold: number = 10): boolean {
    return this.stock > 0 && this.stock <= threshold;
  }

  canBeSold(quantity: number): boolean {
    return this.isActive() && this.stock >= quantity;
  }

  decreaseStock(quantity: number): void {
    if (this.canBeSold(quantity)) {
      this.stock -= quantity;
      this.updatedAt = new Date();
    }
  }

  increaseStock(quantity: number): void {
    this.stock += quantity;
    this.updatedAt = new Date();
  }

  validatePrice(): boolean {
    return this.price > 0;
  }

  getDiscountedPrice(discountPercentage: number): number {
    if (discountPercentage <= 0 || discountPercentage > 100) {
      return this.price;
    }
    return this.price * (1 - discountPercentage / 100);
  }

  static validate(data: any): string[] {
    const errors: string[] = [];
    
    if (!data.name || data.name.trim().length === 0) {
      errors.push('El nombre del producto es requerido');
    }
    
    if (data.name && data.name.length > 100) {
      errors.push('El nombre del producto no puede exceder 100 caracteres');
    }
    
    if (data.price === undefined || data.price === null) {
      errors.push('El precio del producto es requerido');
    } else if (data.price < 0) {
      errors.push('El precio no puede ser negativo');
    }
    
    if (data.stock !== undefined && data.stock < 0) {
      errors.push('El stock no puede ser negativo');
    }
    
    if (!data.category || data.category.trim().length === 0) {
      errors.push('La categoría del producto es requerida');
    }
    
    return errors;
  }
}

export type { Category } from '../types/Category';