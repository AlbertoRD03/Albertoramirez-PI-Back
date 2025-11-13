# **Sprint 4: Modelado del Proyecto FitTrack**
## 🧱 Punto 1: Modelado de Dominio y Base de Datos

### 📌 Imagen del Diagrama Entidad-Relación (DER) de MySQL
- **Contenido:** Diagrama visual que muestra las 7 tablas del modelo relacional, sus atributos y relaciones.
![Diagrama MySQL](/Media/Sprint%204/FitTRACK-MySQL.png)

### 📌 Imagen del Diagrama de Modelo de Documentos de MongoDB
- **Contenido:** Diagrama visual que representa las colecciones principales (`Sesiones`, `Publicaciones`, `Comentarios`, etc.).
![Diagrama MySQL](/Media/Sprint%204/FitTRACK-Mongo.png)
---

## 🔌 Punto 2: Diseño de Servicios y API

### 📄 Archivo de Especificación de la API
- **Contenido:** Código YAML completo que define todos los endpoints, modelos de datos (DTOs), respuestas y seguridad.
- **Archivo:** `docs/api/openapi.yaml`

### 📘 Documento de Guía de Errores
- **Contenido:** Explicación del formato estándar de errores y uso de códigos HTTP.
- **Archivo:** `docs/api/errores.md`

### 📘 Documento de Convenciones de la API
- **Contenido:** Resumen de convenciones de nombrado, versionado y paginación.
- **Archivo:** `docs/api/convenciones.md`

### 🖼️ Imágenes de los Diagramas de Secuencia
- **Contenido:** 12 diagramas visuales que representan los flujos de interacción clave de la API.
  - `Registro` 
![Diagrama MySQL](/Media/Sprint%204/2.Registro.png)

  - `Login`  
![Diagrama MySQL](/Media/Sprint%204/1.Login.png)

  - `Onboarding`  
![Diagrama MySQL](/Media/Sprint%204/4.Onboarding.png)

  - `Dashboard`  
![Diagrama MySQL](/Media/Sprint%204/5.Dashboard.png)

  - `Registro de sesión`  
![Diagrama MySQL](/Media/Sprint%204/7.RegistroSesion.png)

  - `Logros`  
![Diagrama MySQL](/Media/Sprint%204/9.Logros.png)

  - `Feed de publicaciones`  
![Diagrama MySQL](/Media/Sprint%204/12.fFeed.png)

  - `Usuario crea publicación`  
![Diagrama MySQL](/Media/Sprint%204/13.UsuarioCreaPub.png)

  - `Usuario comenta en publicación`  
![Diagrama MySQL](/Media/Sprint%204/Comentario.png)

  - `Usuario da like a publicación`  
![Diagrama MySQL](/Media/Sprint%204/User-like-pub.png)

  - `Usuario elige reto`  
![Diagrama MySQL](/Media/Sprint%204/15.UsuarioEligeReto.png)

  - `Progreso reto`
![Diagrama MySQL](/Media/Sprint%204/16.ProgresoRetoUsuario.png)
---
# 🧩 3. Descomposición Técnica de HUs en Tareas

## 3.1. Introducción y Metodología

En esta fase del sprint, se descomponen las **Historias de Usuario (HUs)** funcionales en tareas técnicas específicas que representan el trabajo real del equipo de desarrollo. El objetivo es crear un backlog claro y estimado, listo para ser planificado y ejecutado en **Jira Cloud**.

### 🏗️ Categorización por Capa Arquitectónica

Cada tarea se asocia a una capa de la arquitectura mediante los siguientes prefijos:

- `DAT-`: Base de datos (migraciones, scripts, configuración)
- `API-`: Backend (endpoints, lógica de negocio)
- `FE-`: Frontend (vistas, componentes en React)
- `TST-`: Testing (unitarias, integración, contrato)

### 📏 Estimación de Tareas

Se utiliza una escala de **Story Points (SP)** basada en Fibonacci modificada: `1, 2, 3, 5, 8`. Esta medida refleja esfuerzo, complejidad e incertidumbre, no horas.

### ✅ Definition of Ready (DoR)

Una tarea está lista para empezar cuando:

- Tiene una descripción clara y sin ambigüedades.
- Sus criterios de aceptación están definidos.
- Las dependencias están identificadas.
- Ha sido revisada y estimada por el equipo.

### 🏁 Definition of Done (DoD)

Una tarea se considera completada cuando:

- El código cumple los criterios de aceptación.
- Las pruebas automatizadas han sido superadas.
- Ha sido revisada y aprobada por otro miembro del equipo.
- Está desplegada en entorno de desarrollo/staging.
- La documentación relevante ha sido actualizada.

---

## 3.2. Descomposición de Historias de Usuario (HUs)

### 🧍 HU-01: Registro e Inicio de Sesión

> "Como nuevo usuario, quiero poder registrarme e iniciar sesión para acceder a las funcionalidades de FitTrack."

**Épica:** Gestión de Usuarios

| ID      | Capa     | Tarea                                                                 | Estimación |
|---------|----------|-----------------------------------------------------------------------|------------|
| API-01  | Backend  | Implementar `POST /auth/register` con validación y hasheo de contraseña | 3 SP       |
| API-02  | Backend  | Implementar `POST /auth/login` con comparación de hash y generación de JWT | 2 SP       |
| DAT-01  | Datos    | Crear script de migración para la tabla `Usuarios` en MySQL           | 1 SP       |
| FE-01   | Frontend | Crear vista y componentes de Registro en React                        | 2 SP       |
| FE-02   | Frontend | Crear vista y componentes de Inicio de Sesión                         | 2 SP       |
| FE-03   | Frontend | Implementar servicio de autenticación y almacenamiento de JWT         | 3 SP       |
| TST-01  | Pruebas  | Pruebas de contrato y unitarias para `/auth`                          | 2 SP       |

---

### 🏋️ HU-02: Registro de Sesión de Entrenamiento

> "Como usuario, quiero registrar una sesión de entrenamiento detallada para llevar un seguimiento de mi progreso."

**Épica:** Seguimiento de Entrenamientos

| ID      | Capa     | Tarea                                                                 | Estimación |
|---------|----------|-----------------------------------------------------------------------|------------|
| API-03  | Backend  | Implementar `POST /sesiones` en MongoDB con validación de estructura  | 5 SP       |
| API-04  | Backend  | Implementar `GET /ejercicios` desde MySQL con filtros                 | 2 SP       |
| FE-04   | Frontend | Vista principal de "Registrar Sesión" en React                        | 5 SP       |
| FE-05   | Frontend | Componente de selección de ejercicios con búsqueda/filtro             | 3 SP       |
| FE-06   | Frontend | Lógica para añadir/editar/eliminar ejercicios y sets dinámicamente    | 5 SP       |
| FE-07   | Frontend | Conexión del formulario con `POST /sesiones`, manejo de errores       | 2 SP       |
| TST-02  | Pruebas  | Pruebas para `/sesiones` y `/ejercicios`                              | 3 SP       |

---

### 📣 HU-03: Feed de Publicaciones

> "Como usuario, quiero ver un feed de publicaciones de la comunidad para sentirme motivado e interactuar con otros."

**Épica:** Comunidad (Fitgram)

| ID      | Capa     | Tarea                                                                 | Estimación |
|---------|----------|-----------------------------------------------------------------------|------------|
| API-05  | Backend  | Implementar `GET /publicaciones` con datos de MongoDB y MySQL         | 8 SP       |
| API-06  | Backend  | Implementar `POST /publicaciones`                                     | 3 SP       |
| FE-08   | Frontend | Vista del Feed principal                                              | 3 SP       |
| FE-09   | Frontend | Componente "Tarjeta de Publicación"                                   | 3 SP       |
| FE-10   | Frontend | Lógica de scroll infinito o paginación                                | 5 SP       |
| TST-03  | Pruebas  | Pruebas de contrato e integración para `/publicaciones`               | 3 SP       |

---

### 🏆 HU-04: Participación en Retos

> "Como usuario, quiero poder unirme a un reto de la comunidad para tener una meta grupal."

**Épica:** Comunidad (Fitgram)

| ID      | Capa     | Tarea                                                                 | Estimación |
|---------|----------|-----------------------------------------------------------------------|------------|
| API-07  | Backend  | Implementar `POST /retos/{id}/join`                                   | 3 SP       |
| API-08  | Backend  | Lógica para actualizar progreso de retos tras guardar sesión          | 5 SP       |
| DAT-02  | Datos    | Definir esquemas `Retos` y `Progreso_Reto_Usuario` en MongoDB         | 1 SP       |
| FE-11   | Frontend | Vista de retos disponibles                                            | 3 SP       |
| FE-12   | Frontend | Lógica para unirse/abandonar retos y actualizar UI                    | 2 SP       |
| TST-04  | Pruebas  | Pruebas para `/retos`                                                 | 2 SP       |

---

## 3.3. Planificación en Jira Cloud

Las tareas técnicas se gestionarán en **Jira Cloud** siguiendo esta estructura:

- Cada **HU** será un issue de tipo `Story`.
- Cada tarea técnica (ej. `API-01`, `FE-01`) será un `Sub-task` vinculado a su `Story` padre.
- Cada `Sub-task` tendrá su estimación en **Story Points**.
- Las tareas se priorizarán en el backlog del sprint y se revisarán en la ceremonia de planificación.

---

