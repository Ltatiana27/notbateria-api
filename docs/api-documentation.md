# Documentación de la API REST de NotiBatería

**Base URL:** `http://localhost:3000/api`

**Formato de intercambio:** JSON

**Códigos de estado utilizados:**
- 200 OK: Petición exitosa
- 201 Created: Recurso creado exitosamente
- 204 No Content: Recurso eliminado exitosamente
- 400 Bad Request: Error de validación en los datos enviados
- 404 Not Found: Recurso no encontrado
- 500 Internal Server Error: Error interno del servidor

---

## 1. GET /api/configuraciones

**Descripción:** Obtiene la lista de todas las configuraciones registradas.

**Método:** GET

**Parámetros:** Ninguno

**Ejemplo de petición:**

```
GET http://localhost:3000/api/configuraciones
```

**Respuesta exitosa (200 OK):**
```json
[
  { "id": 1, "nombre": "Lizeth Sanabria", "correo": "ltsl35965425@soy.sena.edu.co", "limite": 85 },
  { "id": 2, "nombre": "Dilan Abella", "correo": "dilken111620@gmail.com", "limite": 90 }
]
```
## 2. GET /api/configuraciones/:id

**Descripción:** Obtiene una configuración específica por su ID.

**Método:** GET

**Parámetros de ruta:** 
```
arámetro	Tipo	Descripción
id	integer	ID de la configuración (positivo)
```

**Ejemplo de petición:**

```
GET http://localhost:3000/api/configuraciones/1
```

**Respuesta exitosa (200 OK):**
```json
[
  { "id": 1, "nombre": "Lizeth Sanabria", "correo": "ltsl35965425@soy.sena.edu.co", "limite": 85 }
]
```
**Respuesta de error (404 Not Found):**
```json
[
 { "error": "Configuración no encontrada" }
]
```
## 3. GET /api/configuraciones

**Descripción:** Crea una nueva configuración de usuario.

**Método:** POST

**Parámetros (body):** 
```
Campo	Tipo	Obligatorio	Validación
nombre	string	Sí			Entre 3 y 100 caracteres
correo	string	Sí			Formato de correo válido
limite	integer	Sí			Entero entre 50 y 100
```
**Ejemplo de petición:**

```json
[
  {
	"nombre": "Carlos Pérez",
	"correo": "carlos.perez@example.com",
	"limite": 75
  }
]
```

**Respuesta exitosa (201 Created):**
```json
[
  {
	"id": 3,
	"nombre": "Carlos Pérez",
	"correo": "carlos.perez@example.com",
	"limite": 75
  }
]
```
**Respuesta de error (400 Bad Request):**
```json
[
 {
  "errors": [
    {
      "value": 45,
      "msg": "El límite debe ser un número entero entre 50 y 100",
      "param": "limite",
      "location": "body"
    }
  ]
 }
]
```
## 4. PUT /api/configuraciones/:id

**Descripción:** Actualiza una configuración existente.

**Método:** PUT

**Parámetros de ruta:** 
```
arámetro	Tipo		Descripción
id			integer		ID de la configuración a actualizar
```
**Parámetros (body):** Mismos que POST
```
Parámetro	Tipo		Descripción
id			integer		ID de la configuración a actualizar
```
**Ejemplo de petición:**

```json
[
  PUT http://localhost:3000/api/configuraciones/3
  
  {
	"nombre": "Carlos Pérez Actualizado",
	"correo": "carlos.actualizado@example.com",
	"limite": 95
  }
]
```

**Respuesta exitosa (200 OK):**
```json
[
  {
	"id": 3,
	"nombre": "Carlos Pérez Actualizado",
	"correo": "carlos.actualizado@example.com",
	"limite": 95
  }
]
```
**Respuesta de error (404 Not Found):**
```json
[
 { "error": "Configuración no encontrada" }
]
```
## 5. DELETE /api/configuraciones/:id

**Descripción:** Elimina una configuración por su ID.

**Método:** DELETE

**Parámetros de ruta:** 
```
Parámetro	Tipo		Descripción
id			integer		ID de la configuración a eliminar
```
**Ejemplo de petición:**

```
[
  DELETE http://localhost:3000/api/configuraciones/3
]
```

**Respuesta exitosa (204 No Content):**
```
Sin cuerpo de respuesta
```
**Respuesta de error (404 Not Found):**
```json
[
 {"error": "Configuración no encontrada"}
]
```
---

## 6. Validaciones implementadas

La API aplica las siguientes validaciones en el servidor utilizando `express-validator`:

 Campo  	Validación  				Mensaje de error 
 nombre 	No vacío 					El nombre es obligatorio 
 nombre 	Entre 3 y 100 caracteres 	El nombre debe tener entre 3 y 100 caracteres 
 correo 	No vacío 					El correo es obligatorio 
 correo 	Formato de correo válido 	El correo debe tener un formato válido 
 limite 	No vacío 					El límite es obligatorio 
 limite 	Entero entre 50 y 100 		El límite debe ser un número entero entre 50 y 100 
 id (ruta)  Entero positivo 			El ID debe ser un número entero positivo 

*** Ejemplo de respuesta de error***

Cuando una validación falla, la API responde con el código **400 Bad Request** y la lista de errores:

```json
{
  "errors": [
    {
      "value": 45,
      "msg": "El límite debe ser un número entero entre 50 y 100",
      "param": "limite",
      "location": "body"
    }
  ]
}
```
---

## 7. Cómo consumir la API desde el dashboard React

El dashboard React de NotiBatería ya cuenta con el archivo `configuracionService.js`, 
que actúa como intermediario entre los componentes y la API. Para que el dashboard 
consuma esta API, solo debes asegurarte de que el servidor esté corriendo en 
`http://localhost:3000` y que la URL del servicio apunte correctamente.

***Ejemplo de consumo desde el dashboard***

```javascript
const API_URL = 'http://localhost:3000/api/configuraciones';

const configuracionService = {
  obtenerTodas: async () => {
    const response = await fetch(API_URL);
    return await response.json();
  },
  crear: async (config) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    return await response.json();
  },
  eliminar: async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  },
};
```