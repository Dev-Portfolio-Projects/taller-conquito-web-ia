# ☕ Quito Coffee Roasters  

<p align="center">

<img src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite">
<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/HTML5-CSS3-E34F26?style=for-the-badge&logo=html5">
<img src="https://img.shields.io/badge/SPA-Hash_Routing-blue?style=for-the-badge">
<img src="https://img.shields.io/badge/Responsive-Design-success?style=for-the-badge">

</p>

## ☕ Descripción

**Quito Coffee Roasters** es una aplicación web frontend que simula una tienda digital de cafés ecuatorianos de especialidad.

El sistema permite explorar productos, administrar un carrito de compra, calcular valores de facturación, consultar información dinámica mediante APIs externas y generar comprobantes PDF directamente desde el navegador.

La aplicación está desarrollada como una **SPA (Single Page Application)** utilizando navegación basada en `window.location.hash`, sin backend propio ni router externo.

# ✨ Características principales

| Módulo | Funcionalidades |
|---|---|
| 🏠 Inicio | Hero visual, CTA, clima de Quito y cita inspiradora |
| ☕ Catálogo | Búsqueda, filtros y tarjetas dinámicas |
| 🛒 Carrito | Gestión de productos, cantidades y totales |
| 💱 Conversión | Cambio de moneda mediante API externa |
| 🧾 Facturación | Formulario, validación y PDF |
| 📱 Responsive | Adaptación móvil, tablet y escritorio |

# 🎯 Objetivo del proyecto

Crear una experiencia de compra frontend completa para una cafetería especializada integrando:

- Catálogo dinámico de productos.
- Gestión de pedidos.
- Consumo de servicios externos.
- Validación de información.
- Generación automática de documentos.
- Diseño adaptable.

# 🛠️ Tecnologías utilizadas

## Frontend

| Tecnología | Uso |
|---|---|
| ⚡ Vite | Entorno de desarrollo y construcción |
| 🟨 JavaScript ES6+ | Lógica de aplicación |
| 🌐 HTML5 | Estructura semántica |
| 🎨 CSS3 | Diseño visual |
| 💨 Tailwind CSS | Estilos y utilidades |

## Librerías

| Librería | Función |
|---|---|
| Lucide Icons | Iconografía |
| html2canvas | Captura de elementos HTML |
| jsPDF | Creación de documentos PDF |

# 🔌 APIs utilizadas

| API | Propósito |
|---|---|
| 🌤 Open-Meteo | Información climática de Quito |
| 💬 DummyJSON Quotes | Citas aleatorias |
| 🌎 MyMemory Translate | Traducción automática |
| 💱 ExchangeRate API | Conversión de monedas |

# 🚀 Funcionalidades

## 🏠 Página principal

Incluye:

- Hero con identidad visual.
- Botón de acceso al catálogo.
- Cita inspiradora dinámica.
- Traducción automática.
- Widget climático.
- Información general del negocio.

# ☕ Catálogo de cafés

Características:

✅ Lista de productos.  
✅ Búsqueda por nombre.  
✅ Filtro por origen.  
✅ Renderizado dinámico.  
✅ Tarjetas con información del producto.

# 🛒 Carrito de compra

Incluye:

- Panel lateral desplegable.
- Agregar productos.
- Reducir cantidades.
- Eliminar productos.
- Cálculo automático.
- Selección de envío.
- Conversión de monedas.

# 🧾 Facturación

Funciones:

- Validación formulario.
- Mensajes de error.
- Resumen de pedido.
- Descarga del comprobante PDF.

# 📁 Estructura del proyecto

```text
proyecto-final/

├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── images/
└── src/
    ├── main.js
    ├── api/
    │   ├── exchangeAPI.js
    │   ├── quoteAPI.js
    │   ├── translateAPI.js
    │   └── weatherAPI.js
    ├── components/
    │   ├── cart/
    │   ├── catalog/
    │   ├── home/
    │   ├── invoice/
    │   └── layout/
    ├── data/
    │   └── coffees.js
    ├── state/
    │   └── store.js
    └── styles/
        ├── main.css
        ├── variables.css
        └── animations.css
```

## Components

Gestionan la interfaz:

- Navbar.
- Footer.
- Home.
- Catálogo.
- Carrito.
- Facturación.

## State

Administra:

- Productos seleccionados.
- Estado del carrito.
- Totales.
- Datos temporales del pedido.

## API Layer

Centraliza:

- Clima.
- Traducción.
- Conversión monetaria.
- Citas dinámicas.

# ⚡ Instalación

## Requisitos

- Node.js
- pnpm

## Instalar dependencias

```bash
pnpm install
```

# ▶️ Ejecutar proyecto

Modo desarrollo:

```bash
pnpm dev
```

Aplicación disponible en:

```text
http://localhost:5173
```

# 🧪 Manejo de errores

El sistema implementa:

- Manejo `try/catch` en APIs.
- Valores alternativos cuando servicios fallan.
- Validación de formularios.
- Bloqueo de acciones inválidas.
- Mensajes visuales de error.

# 📱 Diseño Responsive

| Dispositivo | Adaptación |
|---|---|
| 🖥 Desktop | Grid completo y navegación amplia |
| 💻 Tablet | Componentes flexibles |
| 📱 Mobile | Menús, formularios y carrito adaptados |
