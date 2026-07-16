# Quito Coffee Roasters - Dashboard Web Interactivo

## Descripción del proyecto

Quito Coffee Roasters es una aplicación frontend construida con Vite que presenta un catálogo interactivo de cafés de especialidad, un carrito lateral de compra, un flujo de facturación y utilidades de contexto como clima local, cita inspiradora y conversión de moneda.

El proyecto funciona como una SPA basada en `window.location.hash`, por lo que la navegación entre inicio, catálogo y facturación se resuelve en el cliente sin un router externo ni un backend propio.

## Objetivo del sistema

Centralizar la experiencia de descubrimiento y compra de cafés ecuatorianos en una interfaz visualmente cuidada, permitiendo explorar productos, agregarlos al carrito, calcular totales con IVA y envío, y generar una factura PDF en el navegador.

## Problema de negocio solucionado

La aplicación cubre un flujo de venta simple para un negocio de café de especialidad:

- exposición de productos con búsqueda y filtro por origen;
- captura de un pedido sin depender de un servidor;
- cálculo automático de subtotal, IVA, envío y monedas equivalentes;
- generación de un comprobante PDF descargable.

## Tecnologías utilizadas

- Vite
- JavaScript ES6+
- HTML5
- CSS3
- Tailwind CSS
- Lucide Icons
- html2canvas
- jsPDF
- Fetch API

## Características implementadas

### Presentación

- Landing page con hero visual y CTA hacia el catálogo.
- Cita inspiradora cargada desde API externa y traducida al español.
- Widget de clima para Quito con carga asíncrona.
- Footer informativo con contacto, horario y datos de desarrollo.

### Catálogo

- Lista de cafés de especialidad cargada desde datos locales.
- Búsqueda por nombre.
- Filtro por origen.
- Tarjetas con imagen, notas, precio y botón de agregar al carrito.

### Gestión de productos

- Datos de productos centralizados en un arreglo local.
- Estructura preparada para añadir más referencias sin cambiar la lógica principal.
- Render dinámico de tarjetas a partir de los datos.

### Carrito / pedido

- Carrito lateral desplegable.
- Aumento, disminución y eliminación de productos.
- Cálculo automático de subtotal, IVA y total.
- Selector de zona de envío con valores definidos por la interfaz.
- Conversión del total a EUR, GBP, JPY, COP y MXN mediante API externa.

### Formularios

- Formulario de facturación con nombre, cédula/RUC, teléfono, correo y dirección.
- Validación de campos en cliente antes de generar la factura.
- Estados visuales de error en campos inválidos.

### APIs

- Clima en Quito mediante Open-Meteo.
- Cita aleatoria desde DummyJSON.
- Traducción de la cita mediante MyMemory.
- Tasas de cambio mediante ER API.

### Diseño responsive

- Navegación adaptable a escritorio y móvil.
- Grid responsivo para tarjetas de catálogo.
- Drawer lateral para carrito.
- Modales y formularios adaptados a pantallas medianas y grandes.

## Arquitectura del proyecto

Estructura real del proyecto:

```text
proyecto-final/
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── vite.config.js
├── public/
└── src/
	├── main.js
	├── api/
	│   ├── exchangeAPI.js
	│   ├── quoteAPI.js
	│   ├── translateAPI.js
	│   └── weatherAPI.js
	├── assets/
	├── components/
	│   ├── cart/
	│   │   ├── Cart.html
	│   │   └── Cart.js
	│   ├── catalog/
	│   │   ├── Catalog.html
	│   │   └── Catalog.js
	│   ├── home/
	│   │   ├── Hero.html
	│   │   └── Hero.js
	│   ├── invoice/
	│   │   ├── Invoice.html
	│   │   ├── Invoice.js
	│   │   ├── InvoicePDF.css
	│   │   └── InvoicePDF.html
	│   └── layout/
	│       ├── Footer/
	│       │   ├── Footer.html
	│       │   └── Footer.js
	│       └── Navbar/
	│           ├── Navbar.html
	│           └── Navbar.js
	├── data/
	│   └── coffees.js
	├── state/
	│   └── store.js
	├── styles/
	│   ├── animations.css
	│   ├── main.css
	│   └── variables.css
	└── utils/
```

## Implementación técnica

### HTML5

- Se utilizan etiquetas semánticas como `header`, `nav`, `main`, `section`, `article`, `aside`, `form`, `table` y `footer`.
- El proyecto incluye textos alternativos en imágenes relevantes.
- Hay uso puntual de accesibilidad mediante `aria-label` en el botón de menú móvil.
- Los campos de formulario usan `required` para reforzar la validación nativa del navegador.

Limitación observada: no se aprecia una capa amplia de ARIA ni asociación explícita de etiquetas `label` con cada campo, por lo que la accesibilidad es correcta a nivel básico, pero mejorable.

### CSS3

- Variables CSS centralizadas en `src/styles/variables.css`.
- Estilos globales y utilidades personalizadas en `src/styles/main.css`.
- Uso de Flexbox y Grid para composición visual.
- Diseño responsive con clases adaptativas por breakpoint.
- Animaciones sutiles para entrada y flotación en hero.

### JavaScript ES6+

- Uso de `const` y `let`.
- Funciones flecha en todo el proyecto.
- Importación y exportación de módulos.
- Uso de `async/await` para APIs y conversión de moneda.
- Uso de `fetch` para consumo de servicios externos.
- Uso de métodos de arreglos como `map`, `filter`, `find` y `reduce`.
- Manejo del DOM mediante `querySelector`, `classList`, `innerHTML` y eventos.

## APIs utilizadas

| API                | Propósito                     | Implementación                                                                                        |
| ------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| Open-Meteo         | Obtener clima actual de Quito | Se consume en `src/api/weatherAPI.js` para mostrar temperatura, estado y viento en la barra superior. |
| DummyJSON Quotes   | Obtener una cita aleatoria    | Se consume en `src/api/quoteAPI.js` para cargar una frase en el hero.                                 |
| MyMemory Translate | Traducir la cita al español   | Se consume en `src/api/translateAPI.js` como paso intermedio de la cita.                              |
| ER API             | Consultar tasas de cambio     | Se consume en `src/api/exchangeAPI.js` para convertir el total del carrito a varias monedas.          |

## Manejo de errores

El proyecto implementa manejo de errores en varias capas:

- `try/catch` en las llamadas a APIs externas.
- Valores de respaldo cuando el clima, la traducción o la cita no están disponibles.
- Validación previa a la generación del PDF.
- Mensajes visibles para campos inválidos del formulario.
- Deshabilitación del botón de generación hasta que el formulario y el carrito sean válidos.

Limitación observada: no existe persistencia de pedidos ni recuperación de errores desde un backend, porque toda la lógica se resuelve en el cliente.

## Despliegue

Repositorio:
[URL]

Demo:
[URL]

Nota: el proyecto incluye la dependencia `gh-pages`, pero en el `package.json` no se observa un script de publicación configurado. Si se desea automatizar el despliegue, conviene agregar un flujo de build y publicación específico.

## Uso de Inteligencia Artificial

Esta sección debe completarse con información real del autor del proyecto. El repositorio no contiene evidencia verificable sobre herramientas de IA, prompts o flujo de asistencia utilizado.

### Herramientas utilizadas

- [Completar]

### Cómo ayudaron

- [Completar]

### Prompts utilizados

- [Completar]

### Reflexión sobre uso responsable

- [Completar]

## Reflexión final

Quito Coffee Roasters resuelve de forma sólida una experiencia de compra frontend para un negocio de café, combinando catálogo, carrito, validación de datos y generación de factura en una sola interfaz. La decisión de trabajar sin backend mantiene el proyecto ligero y fácil de desplegar, aunque también limita la persistencia de datos y la trazabilidad de pedidos. A nivel técnico, la separación por módulos facilita entender el flujo de navegación y mantiene acotadas las responsabilidades de cada componente. El uso de APIs externas aporta contexto y dinamismo, pero introduce dependencias que deben contemplarse en la experiencia de usuario mediante fallbacks. En conjunto, el proyecto muestra una implementación funcional y coherente con una lógica de compra simple, con margen claro para evolucionar hacia una solución más robusta si en el futuro se integra almacenamiento, autenticación y procesos de pago.

## Mejoras futuras

- Persistir el carrito en `localStorage`.
- Agregar un backend para registrar pedidos.
- Incorporar autenticación de usuario.
- Añadir etiquetas `label` explícitas a los campos del formulario.
- Mejorar la capa ARIA en el menú móvil y el modal PDF.
- Crear un flujo de despliegue automatizado para GitHub Pages.
- Refactorizar utilidades compartidas en `src/utils/`.
- Centralizar lógica de negocio en `src/services/`.
