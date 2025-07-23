#!/bin/bash

# Script de deployment para la Panadería

echo "🥖 Deploying Panadería Delicias..."

# Build de la aplicación
echo "📦 Building application..."
npm run build

# Crear el contenedor Docker
echo "🐳 Building Docker image..."
docker build -t panaderia-delicias .

# Opcional: Push a registry (descomenta si usas un registry)
# echo "📤 Pushing to registry..."
# docker tag panaderia-delicias your-registry.com/panaderia-delicias
# docker push your-registry.com/panaderia-delicias

echo "✅ Deployment ready!"
echo "🚀 Run with: docker run -p 3000:3000 panaderia-delicias"
