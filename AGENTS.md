# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Desarrollo de API REST para Catálogo de Productos**.

| | |
|---|---|
| Tema | Construcción de APIs REST con Express |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / Express 4.21.0 |
| Patron arquitectonico | capas estándar (dominio, aplicación, infraestructura) |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @types/express 4.17.21
- express 4.21.0
- typescript 5.7.0
- class-validator 0.14.1
- class-transformer 0.5.1
- reflect-metadata 0.2.2
- mongoose 8.7.0
- @types/mongoose 5.11.97
- dotenv 16.4.5
- cors 2.8.5
- @types/cors 2.8.17
- swagger-ui-express 5.0.1
- yamljs 0.3.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Definición del Modelo de Datos**: Modelo de datos para los productos del catálogo.
- **Fase 2 — Implementación de Endpoints REST**: Endpoints REST implementados para el catálogo de productos.
- **Fase 3 — Optimización y Escalabilidad**: API optimizada para manejar el volumen pico especificado.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `Dockerfile` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.
- [ ] `docker-compose.yml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.

## Lo que falta y tenes que completar

### 1. Referencias colgando (5)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/application/controllers/ProductController.ts` — `ProductService.findAll`
      Se invoca `findAll` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/application/controllers/ProductController.ts` — `ProductService.findOne`
      Se invoca `findOne` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/application/controllers/ProductController.ts` — `ProductService.create`
      Se invoca `create` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/application/controllers/ProductController.ts` — `ProductService.update`
      Se invoca `update` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/application/controllers/ProductController.ts` — `ProductService.delete`
      Se invoca `delete` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (20)

- `package.json`
- `tsconfig.json`
- `src/main.ts`
- `src/domain/models/Product.ts`
- `src/domain/validators/ProductValidator.ts`
- `src/domain/exceptions/ValidationException.ts`
- `src/app.ts`
- `src/app.module.ts`
- `src/domain/exceptions/DuplicateProductException.ts`
- `src/domain/exceptions/ProductNotFoundException.ts`
- `src/infrastructure/repositories/ProductRepository.ts`
- `src/application/services/ProductService.ts`
- `src/application/controllers/ProductController.ts`
- `src/application/middlewares/errorHandler.ts`
- `src/config/database.ts`
- `src/utils/response.ts`
- `.env.example`
- `Dockerfile`
- `docker-compose.yml`
- `src/domain/types/Category.ts`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/domain/models`
- `src/domain/validators`
- `src/domain/exceptions`
- `src/application/services`
- `src/application/controllers`
- `src/application/middlewares`
- `src/infrastructure/repositories`
- `src/config`
- `src/utils`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar (dominio, aplicación, infraestructura)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2
- Brecha que el reto ataca: Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261106172943501), Expone endpoints REST con validacion de entrada y manejo centralizado de errores
- Mision: Exponer el catalogo de productos

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
