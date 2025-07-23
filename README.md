# 🥖 Panadería Delicias - Frontend

Una aplicación web moderna para la gestión de pedidos de una panadería, desarrollada con Next.js 15 y TailwindCSS.

## ✨ Características

- **🛒 Carrito de Compras**: Agregar productos, modificar cantidades y realizar pedidos
- **📱 Responsive Design**: Optimizado para móviles, tablets y escritorio
- **🎨 UI Moderna**: Diseñado con TailwindCSS y iconos de Lucide
- **⚡ Next.js 15**: Con Turbopack para desarrollo ultrarrápido
- **🔧 TypeScript**: Tipado estricto para mejor mantenimiento
- **🐳 Docker Ready**: Configuración completa para containerización

## 🚀 Quick Start

### Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir http://localhost:3000 en tu navegador
```

### Producción

```bash
# Build de producción
npm run build

# Ejecutar servidor de producción
npm run start

# O usar Docker
./deploy.sh
```

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo con Turbopack
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting con ESLint
- `./deploy.sh` - Script de deployment con Docker

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página principal
├── components/            # Componentes React
│   ├── Cart.tsx          # Carrito de compras
│   ├── Header.tsx        # Header/Navegación
│   ├── OrderList.tsx     # Lista de pedidos
│   └── ProductCard.tsx   # Card de producto
├── hooks/                # Custom hooks
│   └── useCart.ts        # Hook para manejo del carrito
└── types/                # Definiciones TypeScript
    └── index.ts          # Tipos de datos
```

## 🔧 Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: TailwindCSS 4
- **Iconos**: Lucide React
- **Container**: Docker
- **Herramientas**: ESLint, PostCSS

## 🌐 API Integration

El proyecto está preparado para conectar con el backend. Los tipos están definidos en `/src/types/`:

```typescript
// Contratos con el backend
export interface ProductModel {
  id: number;
  name: string;
  price: number;
  descripcion: string;
}

export interface OrderModel {
  id: number;
  client: string;
  total: number;
  date: string;
}
```

## 🐳 Docker

El proyecto incluye un Dockerfile optimizado para producción:

```bash
# Build de la imagen
docker build -t panaderia-delicias .

# Ejecutar contenedor
docker run -p 3000:3000 panaderia-delicias
```

## 🎯 Próximos Pasos

1. **Conectar con Backend**: Implementar llamadas reales a la API
2. **Base de Datos**: Persistencia de pedidos y productos
3. **Autenticación**: Sistema de login para administradores
4. **Notificaciones**: Alertas de pedidos nuevos
5. **Imágenes**: Upload y display de fotos de productos

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

---

*Desarrollado con ❤️ para Panadería Delicias*
