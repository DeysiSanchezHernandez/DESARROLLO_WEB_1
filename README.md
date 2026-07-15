## Descripción

**Pollería La Cabañita** es una aplicación web estática desarrollada para mejorar la presencia digital de una pollería ubicada en Bagua, Perú.

El sitio permite presentar la identidad del negocio, mostrar sus productos organizados por categorías, consultar información de contacto, visualizar su ubicación, registrar opiniones y construir un pedido mediante un carrito de compras.

El proyecto fue elaborado como trabajo final del curso **Desarrollo de Aplicaciones Web I**, aplicando HTML semántico, CSS, JavaScript, Bootstrap, diseño responsive y almacenamiento local en el navegador.

> **Sitio publicado:** pollerialacabanitabagua.netlify.app

> **Repositorio:** [DeysiSanchezHernandez/DESARROLLO_WEB_1](https://github.com/DeysiSanchezHernandez/DESARROLLO_WEB_1)

---

## Objetivo del proyecto

Desarrollar un sitio web moderno, funcional y adaptable que permita a la Pollería La Cabañita:

- Presentar su identidad, historia, productos y medios de contacto.
- Facilitar la consulta del menú desde teléfonos, tabletas y computadoras.
- Permitir al cliente seleccionar productos y preparar un pedido.
- Brindar acceso directo a WhatsApp y redes sociales.
- Mejorar la difusión digital del negocio mediante una URL pública.

---

## Funcionalidades principales

### Página de inicio

- Presentación visual del negocio.
- Promociones y productos destacados.
- Accesos directos al menú y a WhatsApp.
- Carrusel responsivo de opiniones.
- Formulario para registrar nuevas opiniones.
- Calificación mediante estrellas.
- Resumen del promedio de valoraciones.

### Menú de productos

- Carga dinámica de productos desde `data/productos.json`.
- Organización por categorías:
  - Combos.
  - Pollos a la brasa.
  - Parrillas.
  - Papas y acompañamientos.
  - Ensaladas.
  - Bebidas.
  - Cremas.
- Búsqueda por nombre o descripción.
- Filtrado por categoría.
- Ordenamiento por destacados, nombre y precio.
- Tarjetas responsivas con imagen, descripción y precio.
- Botón para agregar productos al carrito.

### Carrito de compras

- Agregar productos desde el menú.
- Incrementar o reducir cantidades.
- Eliminar productos seleccionados.
- Vaciar el carrito.
- Cálculo automático del subtotal y total.
- Persistencia de productos mediante `LocalStorage`.
- Formulario con validaciones para los datos del cliente.
- Selección del tipo de entrega.
- Preparación del pedido para enviarlo mediante WhatsApp.

### Información del negocio

- Página institucional “Nosotros”.
- Presentación del equipo y del establecimiento.
- Dirección, teléfono y horario de atención.
- Botones de llamada y WhatsApp.
- Mapa interactivo implementado con Leaflet.
- Preguntas frecuentes.
- Enlaces a Instagram, Facebook y TikTok.

### Experiencia de usuario

- Diseño mobile first.
- Navegación adaptable mediante menú hamburguesa.
- Modo claro y modo nocturno.
- Preferencia del tema almacenada en `LocalStorage`.
- Indicador de carga entre páginas.
- Botón flotante para volver al inicio.
- Botón flotante de WhatsApp.
- Mensajes de confirmación al agregar productos.
- Compatibilidad con distintos tamaños de pantalla.

---

## Tecnologías utilizadas

| Tecnología | Uso dentro del proyecto |
|---|---|
| HTML5 | Estructura semántica de las páginas |
| CSS3 | Identidad visual, animaciones y diseño responsive |
| JavaScript ES6 | Interactividad, catálogo, carrito, opiniones y validaciones |
| Bootstrap 5.3.3 | Grillas, navegación, formularios y componentes adaptables |
| Bootstrap Icons | Iconografía de navegación, contacto y redes sociales |
| JSON | Almacenamiento estructurado del catálogo de productos |
| LocalStorage | Persistencia del carrito, opiniones y tema visual |
| Leaflet 1.9.4 | Mapa interactivo de ubicación |
| Google Fonts | Tipografía principal del sitio |
| Git y GitHub | Control de versiones y trabajo colaborativo |
| Netlify | Publicación del sitio web en Internet |

---

## Estructura del proyecto

```text
DESARROLLO_WEB_1/
│
├── data/
│   └── productos.json
│
├── imagenes/
│   ├── LOGOBNPOS.png
│   ├── favicon-cabanita.png
│   └── imágenes de productos, fondos y equipo
│
├── js/
│   ├── app.js
│   ├── carrito.js
│   ├── loader.js
│   ├── mapa.js
│   ├── menu.js
│   └── opiniones.js
│
├── carrito.html
├── contactanos.html
├── index.html
├── menu.html
├── nosotros.html
├── style.css
└── README.md
```

### Descripción de los archivos JavaScript

| Archivo | Responsabilidad |
|---|---|
| `app.js` | Gestión general del carrito, contador, tema y botón de retorno |
| `menu.js` | Carga, búsqueda, filtrado, ordenamiento y renderizado del catálogo |
| `carrito.js` | Gestión de cantidades, totales, formulario y preparación del pedido |
| `opiniones.js` | Registro, almacenamiento y visualización de reseñas |
| `mapa.js` | Inicialización del mapa y marcador del establecimiento |
| `loader.js` | Animación de carga durante la navegación |

---

## Páginas disponibles

| Página | Archivo | Descripción |
|---|---|---|
| Inicio | `index.html` | Presentación, promociones y opiniones |
| Menú | `menu.html` | Catálogo dinámico de productos |
| Nosotros | `nosotros.html` | Historia, valores y equipo |
| Contáctanos | `contactanos.html` | Ubicación, contacto y preguntas frecuentes |
| Carrito | `carrito.html` | Productos seleccionados y datos del pedido |

---

## Ejecución local

### Requisitos

No se requiere instalar Node.js, bases de datos ni dependencias mediante un gestor de paquetes.

Se recomienda utilizar:

- Visual Studio Code.
- Extensión **Live Server**.
- Un navegador actualizado, como Chrome, Edge o Firefox.

### Pasos

1. Clona el repositorio:

```bash
git clone https://github.com/DeysiSanchezHernandez/DESARROLLO_WEB_1.git
```

2. Ingresa a la carpeta:

```bash
cd DESARROLLO_WEB_1
```

3. Abre el proyecto en Visual Studio Code:

```bash
code .
```

4. Haz clic derecho sobre `index.html`.

5. Selecciona **Open with Live Server**.

También puedes ejecutar un servidor local con Python:

```bash
python -m http.server 5500
```

Después abre en el navegador:

```text
http://localhost:5500
```

> No se recomienda abrir `index.html` directamente con `file://`, porque el catálogo utiliza `fetch()` para leer `data/productos.json` y algunos navegadores bloquean esa solicitud sin un servidor local.

---

## Flujo básico de uso

1. El usuario ingresa a la página de inicio.
2. Accede al menú mediante el botón principal o la barra de navegación.
3. Busca, filtra u ordena los productos disponibles.
4. Agrega uno o más productos al carrito.
5. Revisa las cantidades y el total.
6. Completa sus datos personales y el tipo de entrega.
7. Prepara el pedido para enviarlo al negocio mediante WhatsApp.

---

## Diseño responsivo

El sitio fue desarrollado siguiendo un enfoque **mobile first**.

La interfaz se adapta a:

- Teléfonos móviles.
- Tabletas.
- Computadoras portátiles.
- Pantallas de escritorio.

Entre los comportamientos responsivos implementados se encuentran:

- Menú hamburguesa en pantallas pequeñas.
- Una tarjeta de producto por fila en móviles.
- Dos tarjetas por fila en tabletas.
- Tres o cuatro tarjetas por fila en pantallas grandes.
- Carrusel de opiniones con cantidad adaptable de tarjetas.
- Reorganización vertical del carrito y los formularios en móviles.
- Ajuste del mapa, imágenes, botones y tipografías.
- Prevención del desbordamiento horizontal.

---

## Almacenamiento en el navegador

El proyecto utiliza `LocalStorage` para conservar información sin necesidad de un servidor backend.

| Clave | Información almacenada |
|---|---|
| `carritoCabanita` | Productos y cantidades seleccionadas |
| `opinionesCabanita` | Opiniones registradas por el usuario |
| `temaCabanita` | Preferencia de modo claro u oscuro |

Los datos permanecen en el navegador utilizado. No se sincronizan entre diferentes dispositivos ni usuarios.

---

## Despliegue en Netlify

El proyecto se publicó mediante un despliegue manual:

1. Se clonó o descargó el repositorio.
2. Se verificó que `index.html` estuviera en la raíz.
3. Se comprobó el funcionamiento con Live Server.
4. Se comprimió el proyecto en formato ZIP.
5. Se ingresó a Netlify.
6. Se arrastró el ZIP a la zona de despliegue manual.
7. Netlify generó una URL pública terminada en `netlify.app`.
8. Se probaron las páginas y funciones desde el entorno de producción.

Como el despliegue es manual, después de realizar cambios se debe cargar nuevamente la versión actualizada del proyecto en Netlify.

---

## Pruebas realizadas

La aplicación debe validarse en las siguientes áreas:

- Navegación entre todas las páginas.
- Apertura y cierre del menú móvil.
- Carga del archivo `productos.json`.
- Búsqueda, filtrado y ordenamiento.
- Persistencia del carrito.
- Incremento, reducción y eliminación de productos.
- Validación del formulario de pedido.
- Registro y visualización de opiniones.
- Cambio entre modo claro y oscuro.
- Visualización del mapa.
- Funcionamiento de WhatsApp y redes sociales.
- Ausencia de desplazamiento horizontal.
- Adaptación a móvil, tableta y escritorio.
- Revisión de errores en la consola del navegador.

---

## Equipo de desarrollo

| Integrante | Usuario de GitHub | Participación principal |
|---|---|---|
| Deysi Sanchez Hernandez | [DeysiSanchezHernandez](https://github.com/DeysiSanchezHernandez) | Coordinación, estructura HTML, organización del repositorio, documentación y despliegue |
| David Cotrina Requejo | [DaviTo-png](https://github.com/DaviTo-png) | JavaScript, catálogo, carrito, opiniones y mejoras responsive |
| Cristian Aguilar Vela | Por registrar | Recopilación de información, contenidos, pruebas y evidencias |

---

## Validación con el negocio

Antes del despliegue, el equipo realizó una entrevista con representantes de la Pollería La Cabañita.

Durante la reunión:

- Se recopiló información sobre el negocio.
- Se identificaron necesidades y contenidos.
- Se presentó el diseño propuesto.
- Se revisaron secciones, colores, productos y medios de contacto.
- Se tomaron fotografías como evidencia de la actividad.

La comunicación de la URL pública y la revisión final de la versión desplegada forman parte del cierre del proyecto.

---

## Limitaciones actuales

- La aplicación no utiliza una base de datos remota.
- El carrito y las opiniones solo se conservan en el navegador local.
- No existe autenticación de usuarios.
- No procesa pagos en línea.
- El pedido se completa mediante comunicación externa por WhatsApp.
- El despliegue manual no se actualiza automáticamente con cada `push`.
- Los datos comerciales deben mantenerse actualizados manualmente.

---

## Mejoras futuras

- Conectar Netlify directamente con GitHub para habilitar despliegue continuo.
- Incorporar una base de datos para productos, pedidos y opiniones.
- Crear un panel administrativo.
- Añadir autenticación para administradores.
- Implementar seguimiento del estado de los pedidos.
- Integrar medios de pago.
- Agregar validación o moderación de opiniones.
- Optimizar imágenes mediante formatos modernos.
- Incorporar pruebas automatizadas y auditorías de accesibilidad.
- Añadir un dominio personalizado.

---

## Estado del proyecto

El proyecto se encuentra en una **versión académica funcional** y desplegada como sitio estático.

Antes de considerarlo una solución comercial definitiva, se recomienda realizar una última validación con el representante del negocio, actualizar la URL pública en este documento y comprobar los datos de contacto, precios, horarios e imágenes.

---

## Uso académico

Este repositorio fue desarrollado con fines académicos para el curso **Desarrollo de Aplicaciones Web I**.

Las imágenes, logotipos, información comercial y enlaces asociados al negocio deben utilizarse respetando la autorización de sus propietarios. El repositorio no incluye actualmente una licencia de software de código abierto.
