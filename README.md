# Desarrollo de API REST para Catálogo de Productos

La empresa 'Fintech Soluciones' necesita un catálogo de productos expuesto a través de una API REST. La API debe validar las entradas y manejar los errores de manera centralizada. El catálogo incluye productos con nombre, precio, stock y categoría. Los precios no pueden ser negativos y los nombres no pueden estar duplicados. La API debe ser capaz de manejar un volumen pico de 10,000 solicitudes por minuto con una latencia máxima de 500ms.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construcción de APIs REST con Express |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición del Modelo de Datos

**Objetivo:** Definir el modelo de datos para los productos del catálogo.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Crea el modelo de datos para los productos, incluyendo nombre, precio, stock y categoría. Asegúrate de que los precios no puedan ser negativos y los nombres no puedan estar duplicados.

**Entregable:** Modelo de datos para los productos del catálogo.

<details>
<summary>Pistas de conocimiento</summary>

- Considera los atributos requeridos para cada producto.
- Piensa en las restricciones de negocio para los precios y nombres de los productos.

</details>

### Fase 2: Implementación de Endpoints REST

**Objetivo:** Implementar los endpoints REST para el catálogo de productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa los endpoints REST para listar, crear, actualizar y eliminar productos. Asegúrate de validar las entradas y manejar los errores de manera centralizada.

**Entregable:** Endpoints REST implementados para el catálogo de productos.

<details>
<summary>Pistas de conocimiento</summary>

- Usa el modelo de datos definido en la fase anterior.
- Implementa la validación de entradas y el manejo de errores.

</details>

### Fase 3: Optimización y Escalabilidad

**Objetivo:** Optimizar la API para manejar un volumen pico de 10,000 solicitudes por minuto con una latencia máxima de 500ms.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Optimiza la API para manejar el volumen pico especificado. Asegúrate de que la latencia no supere los 500ms.

**Entregable:** API optimizada para manejar el volumen pico especificado.

<details>
<summary>Pistas de conocimiento</summary>

- Considera técnicas de optimización y escalabilidad.
- Realiza pruebas de carga para verificar el rendimiento.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un endpoint REST y cuál es su propósito en una API?
- **paraQueSirve**: ¿Para qué sirve la validación de entradas en los endpoints REST?
- **comoSeUsa**: ¿Cómo se usa el manejo centralizado de errores en una API REST?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar endpoints REST y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización de una API REST para manejar un volumen pico de solicitudes?

## Criterios de Evaluacion

- Definición correcta del modelo de datos para los productos del catálogo.
- Implementación de endpoints REST con validación de entradas y manejo centralizado de errores.
- Optimización de la API para manejar un volumen pico de 10,000 solicitudes por minuto con una latencia máxima de 500ms.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
