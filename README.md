# ITX Mobile Store 📱

Mini aplicación en React desarrollada como solución a la prueba técnica de ITX.

## Scripts disponibles

- `npm run dev`: Ejecuta la app en modo desarrollo.
- `npm run build`: Genera la build de producción.
- `npm run test`: Ejecuta los test
- `npm run lint`: Linting del código.

## Tecnologías

- React: Framework principal para la UI
- React Router: Gestión del SPA
- Context API: Gestión de estados globales (carrito)
- Axios: Cliente HTTP para consumir la API
- Vite:Bundler, servidor de desarrollo
- localStorage: Persistencia en cliente y caché temporal
- CSS: Estilos globales simples definidos en `styles.css`
- Vitest: Herramienta de testing

## Funcionalidades

- Listado de productos (con búsqueda en tiempo real)
- Vista de detalles del producto
- Añadir al carrito (para persistir, se ha tomado el count devuelto por la API como el valor al que sumarle al carrito
  actual)
- Persistencia de datos con expiración de 1h
- Breadcumbs de navegación
- Gestión de stock (si no trae precio, se considera producto agotado)

## API

Basada en: [https://itx-frontend-test.onrender.com/api](https://itx-frontend-test.onrender.com/api)

## Dependencias

```bash
npm install
```
