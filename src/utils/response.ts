import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  timestamp: string;
  path?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class ResponseBuilder {
  private response: ApiResponse;
  private statusCode: number;

  constructor() {
    this.response = {
      success: false,
      message: '',
      timestamp: new Date().toISOString(),
    };
    this.statusCode = 200;
  }

  setSuccess(success: boolean): this {
    this.response.success = success;
    return this;
  }

  setMessage(message: string): this {
    this.response.message = message;
    return this;
  }

  setData<T>(data: T): this {
    this.response.data = data;
    return this;
  }

  setErrors(errors: string[]): this {
    this.response.errors = errors;
    return this;
  }

  setStatusCode(code: number): this {
    this.statusCode = code;
    return this;
  }

  setPath(path: string): this {
    this.response.path = path;
    return this;
  }

  build(): { response: ApiResponse; statusCode: number } {
    return {
      response: this.response,
      statusCode: this.statusCode,
    };
  }
}

export function successResponse<T>(
  res: Response,
  data: T,
  message: string = 'Operación exitosa',
  statusCode: number = 200
): Response {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  return res.status(statusCode).json(response);
}

export function errorResponse(
  res: Response,
  message: string,
  errors: string[] = [],
  statusCode: number = 500
): Response {
  const response: ApiResponse = {
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
    timestamp: new Date().toISOString(),
  };

  return res.status(statusCode).json(response);
}

export function createdResponse<T>(
  res: Response,
  data: T,
  message: string = 'Recurso creado correctamente'
): Response {
  return successResponse(res, data, message, 201);
}

export function notFoundResponse(
  res: Response,
  message: string = 'Recurso no encontrado',
  errors: string[] = []
): Response {
  return errorResponse(res, message, errors, 404);
}

export function badRequestResponse(
  res: Response,
  message: string = 'Solicitud incorrecta',
  errors: string[] = []
): Response {
  return errorResponse(res, message, errors, 400);
}

export function unauthorizedResponse(
  res: Response,
  message: string = 'No autorizado',
  errors: string[] = []
): Response {
  return errorResponse(res, message, errors, 401);
}

export function forbiddenResponse(
  res: Response,
  message: string = 'Acceso prohibido',
  errors: string[] = []
): Response {
  return errorResponse(res, message, errors, 403);
}

export function conflictResponse(
  res: Response,
  message: string = 'Conflicto de datos',
  errors: string[] = []
): Response {
  return errorResponse(res, message, errors, 409);
}

export function validationErrorResponse(
  res: Response,
  message: string = 'Error de validación',
  errors: string[]
): Response {
  return errorResponse(res, message, errors, 422);
}

export function internalServerErrorResponse(
  res: Response,
  message: string = 'Error interno del servidor',
  errors: string[] = []
): Response {
  return errorResponse(res, message, errors, 500);
}

export function paginatedResponse<T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number,
  message: string = 'Operación exitosa'
): Response {
  const totalPages = Math.ceil(total / limit);
  
  const response: PaginatedResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };

  return res.status(200).json(response);
}

export function noContentResponse(res: Response): Response {
  return res.status(204).send();
}

export function tooManyRequestsResponse(
  res: Response,
  message: string = 'Demasiadas solicitudes',
  errors: string[] = []
): Response {
  return errorResponse(res, message, errors, 429);
}