import { 
  IsNotEmpty, 
  IsString, 
  IsNumber, 
  IsPositive, 
  IsOptional, 
  MinLength, 
  MaxLength, 
  IsEnum, 
  IsArray, 
  ValidateNested,
  IsDateString,
  IsBoolean,
  Max,
  Min
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export enum ProductCategory {
  INVERSION = 'INVERSION',
  CREDITO = 'CREDITO',
  SEGURO = 'SEGURO',
  CUENTA = 'CUENTA',
  TARJETA = 'TARJETA',
  FONDO = 'FONDO',
  Criptomoneda = 'CRIPTOMONEDA',
  OTRO = 'OTRO',
}

export enum ProductStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISCONTINUED = 'DISCONTINUED',
  DRAFT = 'DRAFT',
}

export class ProductPriceValidation {
  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @IsPositive({ message: 'El precio debe ser positivo' })
  @Max(999999999, { message: 'El precio excede el límite máximo permitido' })
  @Transform(({ value }) => parseFloat(value))
  amount!: number;

  @IsString({ message: 'La moneda debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La moneda es requerida' })
  @MaxLength(3, { message: 'El código de moneda debe tener máximo 3 caracteres' })
  @Transform(({ value }) => value?.toUpperCase())
  currency!: string;
}

export class ProductDimensionsValidation {
  @IsOptional()
  @IsNumber({}, { message: 'El peso debe ser un número válido' })
  @IsPositive({ message: 'El peso debe ser positivo' })
  @Max(1000000, { message: 'El peso excede el límite máximo' })
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  weight?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El largo debe ser un número válido' })
  @IsPositive({ message: 'El largo debe ser positivo' })
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  length?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ancho debe ser un número válido' })
  @IsPositive({ message: 'El ancho debe ser positivo' })
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  width?: number;

  @IsOptional()
  @IsNumber({}, { message: 'La altura debe ser un número válido' })
  @IsPositive({ message: 'La altura debe ser positiva' })
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  height?: number;
}

export class ProductImageValidation {
  @IsString({ message: 'La URL de la imagen debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La URL de la imagen es requerida' })
  url!: string;

  @IsOptional()
  @IsString({ message: 'El texto alternativo debe ser una cadena de texto' })
  @MaxLength(200, { message: 'El texto alternativo es demasiado largo' })
  altText?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El orden debe ser un número válido' })
  @Min(0, { message: 'El orden no puede ser negativo' })
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  order?: number;
}

export class CreateProductValidator {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(2000, { message: 'La descripción no puede exceder 2000 caracteres' })
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ValidateNested()
  @Type(() => ProductPriceValidation)
  price!: ProductPriceValidation;

  @IsNumber({}, { message: 'El stock debe ser un número válido' })
  @IsPositive({ message: 'El stock debe ser positivo o cero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @Max(999999, { message: 'El stock excede el límite máximo' })
  @Transform(({ value }) => parseInt(value, 10))
  stock!: number;

  @IsEnum(ProductCategory, { message: 'Categoría de producto inválida' })
  @Transform(({ value }) => value?.toUpperCase())
  category!: ProductCategory;

  @IsEnum(ProductStatusEnum, { message: 'Estado de producto inválido' })
  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  status?: ProductStatusEnum;

  @IsOptional()
  @IsArray({ message: 'Las etiquetas deben ser un arreglo' })
  @IsString({ each: true, message: 'Cada etiqueta debe ser una cadena de texto' })
  @MaxLength(50, { each: true, message: 'Cada etiqueta no puede exceder 50 caracteres' })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v: string) => v.trim().toLowerCase()).filter((v: string) => v.length > 0);
    }
    if (typeof value === 'string') {
      return value.split(',').map((v: string) => v.trim().toLowerCase()).filter((v: string) => v.length > 0);
    }
    return [];
  })
  tags?: string[];

  @ValidateNested()
  @IsOptional()
  @Type(() => ProductDimensionsValidation)
  dimensions?: ProductDimensionsValidation;

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray({ message: 'Las imágenes deben ser un arreglo' })
  @Type(() => ProductImageValidation)
  images?: ProductImageValidation[];

  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El SKU no puede exceder 100 caracteres' })
  @Transform(({ value }) => value?.toUpperCase().trim())
  sku?: string;

  @IsOptional()
  @IsString({ message: 'El código de barras debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El código de barras no puede exceder 50 caracteres' })
  barcode?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo de disponibilidad debe ser un booleano' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  available?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'El precio de descuento debe ser un número válido' })
  @IsPositive({ message: 'El precio de descuento debe ser positivo' })
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  discountPrice?: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de disponibilidad debe ser una fecha válida' })
  availableFrom?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de expiración debe ser una fecha válida' })
  expiresAt?: string;
}

export class UpdateProductValidator {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(200, { message: 'El nombre no puede exceder 200 caracteres' })
  @Transform(({ value }) => value?.trim())
  name?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(2000, { message: 'La descripción no puede exceder 2000 caracteres' })
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductPriceValidation)
  price?: ProductPriceValidation;

  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número válido' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  @Max(999999, { message: 'El stock excede el límite máximo' })
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  stock?: number;

  @IsOptional()
  @IsEnum(ProductCategory, { message: 'Categoría de producto inválida' })
  @Transform(({ value }) => value?.toUpperCase())
  category?: ProductCategory;

  @IsOptional()
  @IsEnum(ProductStatusEnum, { message: 'Estado de producto inválido' })
  @Transform(({ value }) => value?.toUpperCase())
  status?: ProductStatusEnum;

  @IsOptional()
  @IsArray({ message: 'Las etiquetas deben ser un arreglo' })
  @IsString({ each: true, message: 'Cada etiqueta debe ser una cadena de texto' })
  @MaxLength(50, { each: true, message: 'Cada etiqueta no puede exceder 50 caracteres' })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v: string) => v.trim().toLowerCase()).filter((v: string) => v.length > 0);
    }
    if (typeof value === 'string') {
      return value.split(',').map((v: string) => v.trim().toLowerCase()).filter((v: string) => v.length > 0);
    }
    return [];
  })
  tags?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDimensionsValidation)
  dimensions?: ProductDimensionsValidation;

  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray({ message: 'Las imágenes deben ser un arreglo' })
  @Type(() => ProductImageValidation)
  images?: ProductImageValidation[];

  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El SKU no puede exceder 100 caracteres' })
  @Transform(({ value }) => value?.toUpperCase().trim())
  sku?: string;

  @IsOptional()
  @IsString({ message: 'El código de barras debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El código de barras no puede exceder 50 caracteres' })
  barcode?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo de disponibilidad debe ser un booleano' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  available?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'El precio de descuento debe ser un número válido' })
  @IsPositive({ message: 'El precio de descuento debe ser positivo' })
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  discountPrice?: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de disponibilidad debe ser una fecha válida' })
  availableFrom?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de expiración debe ser una fecha válida' })
  expiresAt?: string;
}

export class StockUpdateValidator {
  @IsNumber({}, { message: 'La cantidad debe ser un número válido' })
  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @Transform(({ value }) => parseInt(value, 10))
  quantity!: number;

  @IsOptional()
  @IsString({ message: 'La razón debe ser una cadena de texto' })
  @MaxLength(500, { message: 'La razón no puede exceder 500 caracteres' })
  reason?: string;
}

export class PaginationValidator {
  @IsOptional()
  @IsNumber({}, { message: 'La página debe ser un número válido' })
  @Min(1, { message: 'La página debe ser al menos 1' })
  @Transform(({ value }) => value ? parseInt(value, 10) : 1)
  page?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El límite debe ser un número válido' })
  @Min(1, { message: 'El límite debe ser al menos 1' })
  @Max(100, { message: 'El límite no puede exceder 100' })
  @Transform(({ value }) => value ? parseInt(value, 10) : 10)
  limit?: number;

  @IsOptional()
  @IsString({ message: 'El campo de ordenamiento debe ser una cadena de texto' })
  sortBy?: string;

  @IsOptional()
  @IsString({ message: 'La dirección del ordenamiento debe ser ASC o DESC' })
  @Transform(({ value }) => value?.toUpperCase())
  sortOrder?: 'ASC' | 'DESC';
}

export class ProductQueryValidator {
  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @Transform(({ value }) => value?.toUpperCase())
  category?: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  @Transform(({ value }) => value?.toUpperCase())
  status?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El precio mínimo debe ser un número válido' })
  @IsPositive({ message: 'El precio mínimo debe ser positivo' })
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  minPrice?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El precio máximo debe ser un número válido' })
  @IsPositive({ message: 'El precio máximo debe ser positivo' })
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  maxPrice?: number;

  @IsOptional()
  @IsString({ message: 'La búsqueda debe ser una cadena de texto' })
  @MinLength(2, { message: 'La búsqueda debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'La búsqueda no puede exceder 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  search?: string;

  @IsOptional()
  @IsBoolean({ message: 'El filtro de disponibilidad debe ser un booleano' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  available?: boolean;
}