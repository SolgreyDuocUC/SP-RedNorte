# Frontend SP-RedNorte

Aplicacion web del sistema SP-RedNorte. Provee la interfaz de usuario para la gestion de pacientes, reservas medicas, historial clinico y administracion de usuarios.

---

## Informacion del Proyecto

| Propiedad    | Valor          |
|--------------|----------------|
| Framework    | React          |
| Bundler      | Vite           |
| Puerto dev   | 5173 (default) |

---

## Requisitos Previos

- Node.js 18 o superior
- npm 9 o superior

---

## Instalacion

```bash
npm install
```

---

## Ejecucion en Desarrollo

```bash
npm run dev
```

La aplicacion queda disponible en `http://localhost:5173`.

Los microservicios del backend deben estar corriendo para que la aplicacion funcione correctamente. Consulte el `README.md` en el directorio `backend/` para instrucciones de levantamiento.

---

## Construccion para Produccion

```bash
npm run build
```

Los archivos compilados se generan en el directorio `dist/`.

---

## Microservicios Consumidos

| Servicio          | Puerto | Funcion                      |
|-------------------|--------|------------------------------|
| ms-ficha-clinica  | 8001   | Historial clinico            |
| ms-paciente       | 8002   | Gestion de pacientes         |
| ms-reservas       | 8003   | Agenda y citas medicas       |
| ms-usuarios       | 8004   | Usuarios y roles del sistema |
