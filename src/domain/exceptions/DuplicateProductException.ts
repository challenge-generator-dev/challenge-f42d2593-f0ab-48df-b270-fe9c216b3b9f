export class DuplicateProductException extends Error {
    public readonly productName: string;
    public readonly statusCode: number;
    public readonly timestamp: Date;

    constructor(productName: string, message?: string) {
        const defaultMessage = message || `El producto con nombre '${productName}' ya existe en el catálogo`;
        super(defaultMessage);
        this.name = 'DuplicateProductException';
        this.productName = productName;
        this.statusCode = 409;
        this.timestamp = new Date();
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DuplicateProductException);
        }
    }

    toJSON(): object {
        return {
            name: this.name,
            message: this.message,
            productName: this.productName,
            statusCode: this.statusCode,
            timestamp: this.timestamp.toISOString()
        };
    }

    toString(): string {
        return `[${this.name}] ${this.message} (Producto: ${this.productName})`;
    }

    getProductName(): string {
        return this.productName;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}