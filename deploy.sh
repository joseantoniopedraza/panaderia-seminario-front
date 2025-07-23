#!/bin/bash

# Script de deployment para la Panadería

echo "🥖 Deploying Panadería Delicias..."

# Limpiar builds anteriores
echo "🧹 Cleaning previous builds..."
rm -rf .next
npm run build

# Crear el contenedor Docker
echo "🐳 Building Docker image..."
docker build -t panaderia-delicias .

# Opcional: Ejecutar localmente para probar
echo "🚀 To run locally:"
echo "docker run -p 3000:3000 panaderia-delicias"

# Opcional: Push a registry (descomenta si usas un registry)
# echo "📤 Pushing to registry..."
# docker tag panaderia-delicias your-registry.com/panaderia-delicias
# docker push your-registry.com/panaderia-delicias

echo "✅ Deployment ready!"
echo ""
echo "🌐 Available commands:"
echo "  Local:     docker run -p 3000:3000 panaderia-delicias"
echo "  Dev mode:  npm run dev"
echo "  Build:     npm run build"
