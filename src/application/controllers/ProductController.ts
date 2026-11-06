import { Request, Response, NextFunction } from 'express';
import { ProductService, CreateProductDTO, UpdateProductDTO } from '../services/ProductService';
import { ValidationException } from '../../domain/exceptions/ValidationException';
import { DuplicateProductException } from '../../domain/exceptions/DuplicateProductException';
import { ProductNotFoundException } from '../../domain/exceptions/ProductNotFoundException';

export class ProductController {
  private readonly productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.productService.findAll();
      
      res.status(200).json({
        success: true,
        data: products,
        count: products.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || id.trim() === '') {
        throw new ValidationException('El ID del producto es requerido', ['id es obligatorio']);
      }

      const product = await this.productService.findOne(id);
      
      res.status(200).json({
        success: true,
        data: product,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productData: CreateProductDTO = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
      };

      const createdProduct = await this.productService.create(productData);
      
      res.status(201).json({
        success: true,
        data: createdProduct,
        message: 'Producto creado exitosamente',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || id.trim() === '') {
        throw new ValidationException('El ID del producto es requerido', ['id es obligatorio']);
      }

      const updateData: UpdateProductDTO = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
      };

      const updatedProduct = await this.productService.update(id, updateData);
      
      res.status(200).json({
        success: true,
        data: updatedProduct,
        message: 'Producto actualizado exitosamente',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || id.trim() === '') {
        throw new ValidationException('El ID del producto es requerido', ['id es obligatorio']);
      }

      await this.productService.delete(id);
      
      res.status(200).json({
        success: true,
        message: `Producto con ID ${id} eliminado exitosamente`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      
      if (!id || id.trim() === '') {
        throw new ValidationException('El ID del producto es requerido', ['id es obligatorio']);
      }

      if (quantity === undefined || quantity === null) {
        throw new ValidationException('La cantidad es requerida', ['quantity es obligatorio']);
      }

      const updatedProduct = await this.productService.updateStock(id, quantity);
      
      res.status(200).json({
        success: true,
        data: updatedProduct,
        message: 'Stock actualizado exitosamente',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }
}