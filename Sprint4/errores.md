# Guía de Errores de la API FitTrack

Este documento define el formato estándar para todas las respuestas de error devueltas por la API de FitTrack, así como el significado de los códigos de estado HTTP más comunes.

## Formato Estándar de Respuesta de Error

Cualquier petición que resulte en un error (códigos de estado `4xx` o `5xx`) devolverá un cuerpo de respuesta en formato JSON con la siguiente estructura:

```json
{
  "code": "CODIGO_UNICO_DEL_ERROR",
  "message": "Un mensaje descriptivo y legible para el humano.",
  "details": [
    { 
      "field": "nombre_campo", 
      "issue": "Descripción del problema específico." 
    }
  ]
}```

### Descripción de los Campos

*   **`code`** (string, obligatorio): Un identificador único y programático para el tipo de error. Permite al cliente manejar errores específicos sin depender del texto del mensaje. Ejemplos: `VALIDATION_ERROR`, `UNAUTHENTICATED`, `RESOURCE_NOT_FOUND`.
*   **`message`** (string, obligatorio): Un resumen del error, pensado para ser legible por un desarrollador o para ser mostrado en logs.
*   **`details`** (array, opcional): Un array de objetos que proporciona información granular sobre el error. Es especialmente útil para errores de validación (`400 Bad Request`), donde se puede especificar qué campo falló y por qué.

## Códigos de Estado HTTP Comunes

*   **`400 Bad Request`**: La petición enviada por el cliente es sintácticamente incorrecta o está incompleta. Esto suele ocurrir cuando faltan campos obligatorios en el cuerpo de una petición `POST` o `PATCH`, o cuando los datos no pasan las reglas de validación (ej. un email sin formato de email). La respuesta incluirá el campo `details` para especificar el problema.
*   **`401 Unauthorized`**: La petición requiere autenticación, pero no se ha proporcionado un token JWT válido. Esto puede ocurrir porque el token no se ha incluido en la cabecera `Authorization`, ha expirado o es inválido. El cliente debe solicitar al usuario que inicie sesión de nuevo.
*   **`403 Forbidden`**: El cliente está autenticado (el token JWT es válido), pero no tiene los permisos necesarios para realizar la acción solicitada. Por ejemplo, intentar eliminar una sesión de entrenamiento que pertenece a otro usuario.
*   **`404 Not Found`**: El recurso al que se intenta acceder no existe en el servidor. Por ejemplo, `GET /api/v1/sesiones/9999` si no existe ninguna sesión con el ID 9999.
*   **`500 Internal Server Error`**: Ha ocurrido un error inesperado en el servidor que ha impedido que la petición se complete. Esto indica un problema en el backend y no en la petición del cliente.