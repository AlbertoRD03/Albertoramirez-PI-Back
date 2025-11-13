# Convenciones de la API FitTrack

Este documento resume las principales convenciones de diseño adoptadas para la API de FitTrack, con el fin de asegurar la consistencia y previsibilidad en todos sus endpoints.

## 1. Versionado

Toda la API se encuentra bajo un prefijo de versión en la URL para permitir la evolución futura sin romper integraciones existentes.

*   **Formato:** `/api/v1`
*   **URL Completa de Ejemplo:** `https://api.fittrack.com/api/v1/sesiones`

## 2. Convenciones de Nombrado (Naming Conventions)

Se sigue un sistema de nombrado consistente según el contexto:

| Contexto | Convención | Ejemplo |
| :--- | :--- | :--- |
| **Paths (Rutas URL)** | `kebab-case` | `/objetivos-usuario` |
| **Claves JSON (Request/Response)** | `camelCase` | `{ "fechaCreacion": "..." }` |
| **Base de Datos (MySQL)** | `snake_case` | `fecha_creacion` |

## 3. Autenticación

La autenticación para endpoints protegidos se realiza mediante JSON Web Tokens (JWT). El cliente debe enviar el token en la cabecera `Authorization` de cada petición.

*   **Esquema:** `Bearer`
*   **Ejemplo de Cabecera:** `Authorization: Bearer <token_jwt>`

## 4. Formato de Respuestas Paginadas

Las peticiones `GET` que devuelven una lista de recursos (ej. historial de entrenamientos) utilizarán un envoltorio estándar para incluir metadatos de paginación.

*   **Estructura de la Respuesta:**
    ```json
    {
      "metadata": {
        "totalItems": 150,
        "itemsPerPage": 10,
        "currentPage": 2,
        "totalPages": 15
      },
      "data": [
        // ... array de los objetos del recurso
      ]
    }
    ```

*   **Control de Paginación:** El cliente controla la paginación a través de parámetros de consulta (query params) en la URL.
    *   **`page`**: El número de la página a solicitar (por defecto: `1`).
    *   **`limit`**: El número de ítems por página (por defecto: `10`).
    *   **Ejemplo de Petición:** `GET /api/v1/publicaciones?page=2&limit=20`

Las respuestas que devuelven un único recurso (ej. `GET /api/v1/sesiones/123`) no usan este envoltorio y devuelven el objeto JSON del recurso directamente.