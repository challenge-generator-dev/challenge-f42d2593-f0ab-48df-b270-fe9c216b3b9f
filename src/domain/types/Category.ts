export enum CategoryType {
  FINANCIAL = 'FINANCIAL',
  INSURANCE = 'INSURANCE',
  INVESTMENT = 'INVESTMENT',
  CREDIT = 'CREDIT',
  PAYMENT = 'PAYMENT',
  BANKING = 'BANKING',
  OTHER = 'OTHER',
}

export interface ICategory {
  id?: string;
  name: string;
  code: string;
  description: string;
  type: CategoryType;
  parentId?: string;
  isActive: boolean;
  displayOrder: number;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category implements ICategory {
  id?: string;
  name: string;
  code: string;
  description: string;
  type: CategoryType;
  parentId?: string;
  isActive: boolean;
  displayOrder: number;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Partial<ICategory>) {
    this.id = data.id;
    this.name = data.name || '';
    this.code = data.code || '';
    this.description = data.description || '';
    this.type = data.type || CategoryType.OTHER;
    this.parentId = data.parentId;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.displayOrder = data.displayOrder || 0;
    this.metadata = data.metadata;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static fromDatabase(doc: any): Category {
    return new Category({
      id: doc._id?.toString() || doc.id,
      name: doc.name,
      code: doc.code,
      description: doc.description,
      type: doc.type || CategoryType.OTHER,
      parentId: doc.parentId,
      isActive: doc.isActive !== false,
      displayOrder: doc.displayOrder || 0,
      metadata: doc.metadata,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      description: this.description,
      type: this.type,
      parentId: this.parentId,
      isActive: this.isActive,
      displayOrder: this.displayOrder,
      metadata: this.metadata,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    };
  }

  isRootCategory(): boolean {
    return !this.parentId;
  }

  hasChildren(): boolean {
    return !!this.parentId === false && this.displayOrder > 0;
  }

  getFullPath(): string {
    if (this.isRootCategory()) {
      return this.name;
    }
    return `${this.parentId}/${this.name}`;
  }

  static getAllTypes(): string[] {
    return Object.values(CategoryType);
  }

  static isValidType(type: string): boolean {
    return Object.values(CategoryType).includes(type as CategoryType);
  }

  static getTypeLabel(type: CategoryType): string {
    const labels: Record<CategoryType, string> = {
      [CategoryType.FINANCIAL]: 'Producto Financiero',
      [CategoryType.INSURANCE]: 'Seguro',
      [CategoryType.INVESTMENT]: 'Inversión',
      [CategoryType.CREDIT]: 'Crédito',
      [CategoryType.PAYMENT]: 'Pago',
      [CategoryType.BANKING]: 'Banca',
      [CategoryType.OTHER]: 'Otro',
    };
    return labels[type] || 'Otro';
  }

  static validate(data: any): string[] {
    const errors: string[] = [];
    
    if (!data.name || data.name.trim().length === 0) {
      errors.push('El nombre de la categoría es requerido');
    }
    
    if (data.name && data.name.length > 50) {
      errors.push('El nombre no puede exceder 50 caracteres');
    }
    
    if (!data.code || data.code.trim().length === 0) {
      errors.push('El código de categoría es requerido');
    }
    
    if (data.code && !/^[A-Z0-9_]+$/.test(data.code)) {
      errors.push('El código debe contener solo mayúsculas, números y guiones bajos');
    }
    
    if (!data.type || !Category.isValidType(data.type)) {
      errors.push('El tipo de categoría no es válido');
    }
    
    if (data.displayOrder !== undefined && data.displayOrder < 0) {
      errors.push('El orden de visualización no puede ser negativo');
    }
    
    return errors;
  }
}

export const CATEGORY_CODES = {
  PERSONAL_LOAN: 'PERSONAL_LOAN',
  BUSINESS_LOAN: 'BUSINESS_LOAN',
  SAVINGS_ACCOUNT: 'SAVINGS_ACCOUNT',
  CHECKING_ACCOUNT: 'CHECKING_ACCOUNT',
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  LIFE_INSURANCE: 'LIFE_INSURANCE',
  HEALTH_INSURANCE: 'HEALTH_INSURANCE',
  CAR_INSURANCE: 'CAR_INSURANCE',
  HOME_INSURANCE: 'HOME_INSURANCE',
  MUTUAL_FUND: 'MUTUAL_FUND',
  ETF: 'ETF',
  STOCKS: 'STOCKS',
  BONDS: 'BONDS',
  FIXED_DEPOSIT: 'FIXED_DEPOSIT',
  RECURRING_DEPOSIT: 'RECURRING_DEPOSIT',
} as const;

export type CategoryCode = typeof CATEGORY_CODES[keyof typeof CATEGORY_CODES];