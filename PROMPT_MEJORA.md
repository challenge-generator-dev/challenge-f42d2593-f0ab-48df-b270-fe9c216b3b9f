# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `Dockerfile` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- `docker-compose.yml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/application/controllers/ProductController.ts` — `ProductService.findAll`: Se invoca `findAll` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/application/controllers/ProductController.ts` — `ProductService.findOne`: Se invoca `findOne` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/application/controllers/ProductController.ts` — `ProductService.create`: Se invoca `create` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/application/controllers/ProductController.ts` — `ProductService.update`: Se invoca `update` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/application/controllers/ProductController.ts` — `ProductService.delete`: Se invoca `delete` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261106172943501), Expone endpoints REST con validacion de entrada y manejo centralizado de errores

### Misión / candidato
Exponer el catalogo de productos

### Reto
- Tema: Construcción de APIs REST con Express
- Seniority: advanced-l2
- Tipo: practical
- Título: Desarrollo de API REST para Catálogo de Productos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición del Modelo de Datos — objetivo: Definir el modelo de datos para los productos del catálogo. — entregable (NO resolver): Modelo de datos para los productos del catálogo.
- Fase 2: Implementación de Endpoints REST — objetivo: Implementar los endpoints REST para el catálogo de productos. — entregable (NO resolver): Endpoints REST implementados para el catálogo de productos.
- Fase 3: Optimización y Escalabilidad — objetivo: Optimizar la API para manejar un volumen pico de 10,000 solicitudes por minuto con una latencia máxima de 500ms. — entregable (NO resolver): API optimizada para manejar el volumen pico especificado.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "fintech-product-catalog",
  "version": "1.0.0",
  "description": "API REST para catálogo de productos de Fintech Soluciones",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "ts-node-dev src/main.ts",
    "test": "jest",
    "lint": "eslint 'src/**/*.ts' --fix",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev"
  },
  "keywords": [],
  "author": "Fintech Soluciones",
  "license": "ISC",
  "dependencies": {
    "express": "4.21.0",
    "class-validator": "0.14.1",
    "class-transformer": "0.5.1",
    "reflect-metadata": "0.2.2",
    "mongoose": "8.7.0",
    "dotenv": "16.4.5",
    "cors": "2.8.5",
    "swagger-ui-express": "5.0.1",
    "yamljs": "0.3.0"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/mongoose": "5.11.97",
    "@types/cors": "2.8.17",
    "typescript": "^5.7.3",
    "ts-node-dev": "2.0.0",
    "eslint": "8.57.0",
    "@typescript-eslint/parser": "7.18.0",
    "@typescript-eslint/eslint-plugin": "7.18.0",
    "jest": "29.7.0",
    "@types/jest": "29.5.12",
    "supertest": "6.3.4",
    "@types/supertest": "2.0.16"
  },
  "engines": {
    "node": ">=22.0.0"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}

// === ARCHIVO: src/main.ts ===
import 'reflect-metadata';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import { AppModule } from './app.module';
import { connectDatabase } from './config/database';
import { errorHandler } from './application/middlewares/errorHandler';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,
  maxAge: 86400,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

const swaggerDocument = yaml.load('./swagger.yaml') as object;

if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Fintech Product Catalog API',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  }));

  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.json(swaggerDocument);
  });
}

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

const appModule = new AppModule();
appModule.app = app;
appModule.initializeRoutes();
app.use(errorHandler);

async function bootstrap(): Promise<void> {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fintech-products';
    await connectDatabase(mongoUri);
    console.log('[BOOTSTRAP] Database connected successfully');

    app.listen(PORT, () => {
      console.log(`[SERVER] Running on http://localhost:${PORT}`);
      console.log(`[SERVER] Swagger UI available at http://localhost:${PORT}/api-docs`);
      console.log(`[SERVER] Health check at http://localhost:${PORT}/health`);
      console.log(`[CONFIG] Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`[CONFIG] Max requests per minute: 10000`);
      console.log(`[CONFIG] Max latency: 500ms`);
    });
  } catch (error) {
    console.error('[BOOTSTRAP] Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('[FATAL] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('[FATAL] Uncaught Exception:', error);
  process.exit(1);
});

// === ARCHIVO: src/domain/models/Product.ts ===
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

// === ARCHIVO: src/domain/validators/ProductValidator.ts ===
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

// === ARCHIVO: src/domain/exceptions/ValidationException.ts ===
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

// === ARCHIVO: src/app.ts ===
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import * as path from 'path';
import { ProductController } from './application/controllers/ProductController';
import { ProductService } from './application/services/ProductService';
import { ProductRepository } from './infrastructure/repositories/ProductRepository';
import { errorHandler } from './application/middlewares/errorHandler';
import { successResponse, errorResponse } from './utils/response';
import { ValidationException } from './domain/exceptions/ValidationException';
import { ProductNotFoundException } from './domain/exceptions/ProductNotFoundException';
import { DuplicateProductException } from './domain/exceptions/DuplicateProductException';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateProductValidator, UpdateProductValidator, StockUpdateValidator } from './domain/validators/ProductValidator';

dotenv.config();

export class App {
  public app: Express;
  private productController: ProductController;
  private productService: ProductService;
  private productRepository: ProductRepository;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.productRepository = new ProductRepository();
    this.productService = new ProductService(this.productRepository);
    this.productController = new ProductController(this.productService);
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-Correlation-ID'],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      credentials: true,
      maxAge: 86400,
    }));

    this.app.use(express.json({ 
      limit: '10mb',
      strict: true,
    }));
    
    this.app.use(express.urlencoded({ 
      extended: true, 
      limit: '10mb',
      parameterLimit: 1000,
    }));

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();
      const requestId = req.headers['x-request-id'] || req.headers['x-correlation-id'] || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      (req as any).requestId = requestId;
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        const logLevel = duration > 500 ? 'WARN' : 'INFO';
        console.log(`[${logLevel}] ${requestId} ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
        
        if (duration > 500) {
          console.warn(`[PERFORMANCE] Slow request detected: ${req.method} ${req.path} took ${duration}ms (threshold: 500ms)`);
        }
      });
      
      next();
    });

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path === '/health' || req.path.startsWith('/api-docs')) {
        return next();
      }
      console.log(`[REQUEST] ${req.method} ${req.path} from ${req.ip} - RequestID: ${(req as any).requestId}`);
      next();
    });

    this.initializeSwagger();
  }

  private initializeSwagger(): void {
    const swaggerPath = path.resolve(process.cwd(), 'swagger.yaml');
    
    try {
      const swaggerDocument = yaml.load(swaggerPath) as object;
      
      if (swaggerDocument) {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
          customCss: `
            .swagger-ui .topbar { display: none }
            .swagger-ui .info { margin: 30px 0 }
            .swagger-ui .scheme-container { padding: 20px 0 }
          `,
          customSiteTitle: 'Fintech Product Catalog API - Documentación',
          customfavIcon: '/favicon.ico',
          swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            docExpansion: 'list',
            filter: true,
            showExtensions: true,
            showCommonExtensions: true,
            operationsSorter: 'alpha',
            tagsSorter: 'alpha',
            tryItOutEnabled: true,
          },
        }));

        this.app.get('/api-docs.json', (req: Request, res: Response) => {
          res.setHeader('Content-Type', 'application/json');
          res.json(swaggerDocument);
        });

        this.app.get('/api-docs.yaml', (req: Request, res: Response) => {
          res.setHeader('Content-Type', 'text/yaml');
          res.send(yaml.stringify(swaggerDocument));
        });

        console.log('[SWAGGER] Documentation loaded successfully at /api-docs');
      }
    } catch (error) {
      console.warn('[SWAGGER] Could not load swagger.yaml - documentation endpoints will not be available');
      console.warn('[SWAGGER] Error:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private initializeRoutes(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0',
        requestId: (req as any).requestId,
      });
    });

    this.app.get('/', (req: Request, res: Response) => {
      res.redirect('/api-docs');
    });

    const productRouter = express.Router();

    productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { page, limit, sortBy, sortOrder, category, status, minPrice, maxPrice, search, available } = req.query;
        
        const pageNum = page ? parseInt(page as string, 10) : 1;
        const limitNum = limit ? parseInt(limit as string, 10) : 10;
        
        const filters: any = {};
        if (category) filters.category = category;
        if (status) filters.status = status;
        if (minPrice) filters.minPrice = parseFloat(minPrice as string);
        if (maxPrice) filters.maxPrice = parseFloat(maxPrice as string);
        if (search) filters.search = search;
        if (available !== undefined) filters.available = available === 'true';

        const result = await this.productController.getAll(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        await this.productController.getById(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validator = plainToInstance(CreateProductValidator, req.body);
        const errors = await validate(validator);
        
        if (errors.length > 0) {
          const errorMessages = errors.map(err => 
            Object.values(err.constraints || {}).join(', ')
          );
          throw new ValidationException('Validation failed', errorMessages);
        }

        const existingProduct = await this.productRepository.findByName(req.body.name);
        if (existingProduct) {
          throw new DuplicateProductException(req.body.name);
        }

        await this.productController.create(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validator = plainToInstance(UpdateProductValidator, req.body);
        const errors = await validate(validator);
        
        if (errors.length > 0) {
          const errorMessages = errors.map(err => 
            Object.values(err.constraints || {}).join(', ')
          );
          throw new ValidationException('Validation failed', errorMessages);
        }

        await this.productController.update(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        await this.productController.delete(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.patch('/:id/stock', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validator = plainToInstance(StockUpdateValidator, req.body);
        const errors = await validate(validator);
        
        if (errors.length > 0) {
          const errorMessages = errors.map(err => 
            Object.values(err.constraints || {}).join(', ')
          );
          throw new ValidationException('Validation failed', errorMessages);
        }

        await this.productController.updateStock(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    this.app.use('/api/products', productRouter);

    this.app.use((req: Request, res: Response) => {
      errorResponse(res, 'Endpoint not found', [`Route ${req.method} ${req.path} not found`], 404);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`[SERVER] Application started successfully`);
      console.log(`[SERVER] Listening on port ${this.port}`);
      console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`[SERVER] Health check: http://localhost:${this.port}/health`);
      console.log(`[SERVER] API Documentation: http://localhost:${this.port}/api-docs`);
      console.log(`[CONFIG] Max requests/minute: 10000`);
      console.log(`[CONFIG] Max latency: 500ms`);
    });
  }
}

const application = new App();
application.start();

// === ARCHIVO: src/app.module.ts ===
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import Yaml from 'yamljs';
import path from 'path';
import { ProductController } from './application/controllers/ProductController';
import { ProductService } from './application/services/ProductService';
import { ProductRepository } from './infrastructure/repositories/ProductRepository';
import { errorHandler } from './application/middlewares/errorHandler';
import { validateRequest } from './application/middlewares/validateRequest';

dotenv.config();

export class AppModule {
  private app: Application;
  private productController: ProductController;
  private productService: ProductService;
  private productRepository: ProductRepository;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    
    this.productRepository = new ProductRepository();
    this.productService = new ProductService(this.productRepository);
    this.productController = new ProductController(this.productService);
    
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddlewares(): void {
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
      credentials: true,
      maxAge: 86400
    }));
    
    this.app.use((req: Request, res: Response, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${req.method}] ${req.path} - ${res.statusCode} - ${duration}ms`);
      });
      next();
    });
  }

  private setupRoutes(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    this.app.get('/api', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'Fintech Product Catalog API',
        version: '1.0.0',
        endpoints: [
          'GET /api/products',
          'GET /api/products/:id',
          'POST /api/products',
          'PUT /api/products/:id',
          'DELETE /api/products/:id',
          'PATCH /api/products/:id/stock'
        ]
      });
    });

    this.app.use('/api/products', validateRequest, this.productController.getAll);
    this.app.use('/api/products', validateRequest, this.productController.getById);
    this.app.use('/api/products', validateRequest, this.productController.create);
    this.app.use('/api/products', validateRequest, this.productController.update);
    this.app.use('/api/products', validateRequest, this.productController.delete);
    this.app.use('/api/products', validateRequest, this.productController.updateStock);

    this.setupSwagger();

    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        errors: [`El endpoint ${req.method} ${req.path} no existe`],
        timestamp: new Date().toISOString()
      });
    });
  }

  private setupSwagger(): void {
    try {
      const swaggerPath = path.join(__dirname, '..', 'docs', 'swagger.yaml');
      const swaggerDocument = Yaml.load(swaggerPath);
      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      console.log('Swagger configurado en /api-docs');
    } catch (error) {
      console.log('Swagger no configurado: archivo swagger.yaml no encontrado');
    }
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public getApp(): Application {
    return this.app;
  }

  public getPort(): number {
    return this.port;
  }
}

// === ARCHIVO: src/domain/exceptions/DuplicateProductException.ts ===
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

// === ARCHIVO: src/domain/exceptions/ProductNotFoundException.ts ===
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

// === ARCHIVO: src/infrastructure/repositories/ProductRepository.ts ===
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

// === ARCHIVO: src/application/services/ProductService.ts ===
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

// === ARCHIVO: src/application/controllers/ProductController.ts ===
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

// === ARCHIVO: src/application/middlewares/errorHandler.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationException } from '../../domain/exceptions/ValidationException';
import { DuplicateProductException } from '../../domain/exceptions/DuplicateProductException';
import { ProductNotFoundException } from '../../domain/exceptions/ProductNotFoundException';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);
  console.error('[STACK]', err.stack);

  if (err instanceof ValidationException) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        type: 'ValidationError',
        message: err.message,
        details: err.errors,
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err instanceof DuplicateProductException) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        type: 'DuplicateProductError',
        message: err.message,
        details: err.errors,
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err instanceof ProductNotFoundException) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        type: 'ProductNotFoundError',
        message: err.message,
        details: err.errors,
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: {
        type: 'AuthenticationError',
        message: 'Token de autenticación inválido o expirado',
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err.name === 'CastError' && err.message.includes('ObjectId')) {
    res.status(400).json({
      success: false,
      error: {
        type: 'InvalidIdError',
        message: 'El formato del ID proporcionado no es válido',
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err.code === 11000 || err.code === 11001) {
    res.status(409).json({
      success: false,
      error: {
        type: 'ConflictError',
        message: 'Conflicto de datos: el recurso ya existe',
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      type: 'InternalServerError',
      message: process.env.NODE_ENV === 'production' 
        ? 'Error interno del servidor' 
        : err.message,
      timestamp: new Date().toISOString()
    }
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      type: 'NotFoundError',
      message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
      timestamp: new Date().toISOString()
    }
  });
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[REQUEST] ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });
  
  next();
};

// === ARCHIVO: src/config/database.ts ===
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export interface DatabaseConfig {
  uri: string;
  options: mongoose.ConnectOptions;
}

export const databaseConfig: DatabaseConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fintech-products',
  options: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  },
};

let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 3000;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (isConnected) {
    console.log('Ya existe una conexión activa a MongoDB');
    return mongoose;
  }

  try {
    console.log(`Intentando conectar a MongoDB: ${databaseConfig.uri}`);
    
    await mongoose.connect(databaseConfig.uri, databaseConfig.options);
    
    isConnected = true;
    connectionAttempts = 0;
    
    console.log('Conexión a MongoDB establecida correctamente');
    setupConnectionHandlers();
    
    return mongoose;
  } catch (error) {
    connectionAttempts++;
    console.error(`Error al conectar a MongoDB (intento ${connectionAttempts}/${MAX_RETRY_ATTEMPTS}):`, error);
    
    if (connectionAttempts < MAX_RETRY_ATTEMPTS) {
      console.log(`Reintentando en ${RETRY_DELAY_MS}ms...`);
      await sleep(RETRY_DELAY_MS);
      return connectToDatabase();
    }
    
    console.error('Se agotaron los intentos de conexión. La aplicación continuará sin conexión a la base de datos.');
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (!isConnected) {
    console.log('No hay conexión activa a MongoDB para cerrar');
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Conexión a MongoDB cerrada correctamente');
  } catch (error) {
    console.error('Error al cerrar la conexión a MongoDB:', error);
    throw error;
  }
}

export function getConnectionStatus(): { isConnected: boolean; readyState: string } {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  } as const;
  
  return {
    isConnected,
    readyState: states[mongoose.connection.readyState] || 'unknown',
  };
}

function setupConnectionHandlers(): void {
  mongoose.connection.on('connected', () => {
    console.log('Evento: MongoDB conectado');
    isConnected = true;
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('Evento: MongoDB desconectado');
    isConnected = false;
  });

  mongoose.connection.on('error', (err) => {
    console.error('Evento: Error en MongoDB:', err);
  });

  mongoose.connection.on('reconnected', () => {
    console.log('Evento: MongoDB reconectado');
    isConnected = true;
  });

  mongoose.connection.on('close', () => {
    console.log('Evento: Conexión a MongoDB cerrada');
    isConnected = false;
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isDatabaseConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}

export const mongooseInstance = mongoose;

// === ARCHIVO: src/utils/response.ts ===
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

// === ARCHIVO: .env.example ===
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Conexión a MongoDB
MONGODB_URI=mongodb://localhost:27017/fintech_product_catalog
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=fintech_product_catalog
MONGODB_USER=
MONGODB_PASSWORD=

# Configuración de Swagger/OpenAPI
SWAGGER_ENABLED=true
SWAGGER_PATH=/api/docs
SWAGGER_TITLE=Fintech Product Catalog API
SWAGGER_VERSION=1.0.0
SWAGGER_DESCRIPTION=API REST para catálogo de productos de Fintech Soluciones

# Configuración de CORS
CORS_ORIGIN=http://localhost:3000
CORS_METHODS=GET,POST,PUT,DELETE,PATCH
CORS_CREDENTIALS=true

# Configuración de seguridad
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=24h
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10000

# Configuración de logging
LOG_LEVEL=debug
LOG_FORMAT=combined

# Configuración de timeouts
REQUEST_TIMEOUT_MS=5000
RESPONSE_TIMEOUT_MS=500

# Configuración de base de datos (alternativo a MONGODB_URI)
DB_CONNECTION_STRING=mongodb://localhost:27017
DB_NAME=fintech_product_catalog
DB_OPTIONS='?retryWrites=true&w=majority'

# Configuración de producción
PRODUCTION_URL=https://api.fintech-soluciones.com
PRODUCTION_SSL_ENABLED=false

# Configuración de caché (para optimización)
CACHE_ENABLED=false
CACHE_TTL_MS=300000

# Configuración de métricas
METRICS_ENABLED=false
METRICS_PORT=9090

# Configuración de healthcheck
HEALTHCHECK_ENABLED=true
HEALTHCHECK_PATH=/health

// === ARCHIVO: Dockerfile ===
# Dockerfile stub - Superficie de práctica
# TODO: Implementar configuración de contenedor

// === ARCHIVO: docker-compose.yml ===
# docker-compose.yml stub - Superficie de práctica
# TODO: Implementar orquestación de servicios

// === ARCHIVO: src/domain/types/Category.ts ===
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
```
