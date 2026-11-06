export class ProductNotFoundException extends Error {
    public readonly productId: string | null;
    public readonly productName: string | null;
    public readonly statusCode: number;
    public readonly timestamp: Date;

    constructor(identifier: string, byName: boolean = false) {
        const message = byName
            ? `No se encontró ningún producto con el nombre '${identifier}'`
            : `No se encontró ningún producto con el ID '${identifier}'`;
        
        super(message);
        this.name = 'ProductNotFoundException';
        this.productId = byName ? null : identifier;
        this.productName = byName ? identifier : null;
        this.statusCode = 404;
        this.timestamp = new Date();
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ProductNotFoundException);
        }
    }

    toJSON(): object {
        return {
            name: this.name,
            message: this.message,
            productId: this.productId,
            productName: this.productName,
            statusCode: this.statusCode,
            timestamp: this.timestamp.toISOString()
        };
    }

    toString(): string {
        return `[${this.name}] ${this.message}`;
    }

    getIdentifier(): string | null {
        return this.productId || this.productName;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}