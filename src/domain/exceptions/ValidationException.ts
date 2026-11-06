/**
 * Excepción lanzada cuando ocurre un error de validación en los datos de entrada.
 * Contiene los detalles de los errores para poder informarlos al cliente.
 */
export class ValidationException extends Error {
    public readonly errors: string[];
    public readonly statusCode: number;

    /**
     * Constructor de la excepción.
     * @param message Mensaje descriptivo del error
     * @param errors Lista de mensajes de error detallados
     */
    constructor(message: string, errors: string[] = []) {
        super(message);
        this.name = 'ValidationException';
        this.errors = errors;
        this.statusCode = 400;

        // Mantener el stack trace en V8
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationException);
        }
    }

    /**
     * Convierte la excepción a un objeto plano para serialización.
     * @returns Objeto con los detalles de la excepción
     */
    toJSON(): { message: string; errors: string[]; statusCode: number } {
        return {
            message: this.message,
            errors: this.errors,
            statusCode: this.statusCode
        };
    }

    /**
     * Genera un mensaje de error combinado con todos los detalles.
     * @returns Mensaje combinado
     */
    getCombinedMessage(): string {
        if (this.errors.length === 0) {
            return this.message;
        }
        return `${this.message}: ${this.errors.join('; ')}`;
    }

    /**
     * Verifica si la excepción contiene un error específico.
     * @param errorMessage Mensaje de error a buscar
     * @returns True si el error está presente
     */
    hasError(errorMessage: string): boolean {
        return this.errors.some(error => error.includes(errorMessage));
    }
}