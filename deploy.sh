#!/bin/bash

# Script para deploy en Google Cloud Run
# Uso: ./deploy.sh [PROJECT_ID]

set -e

# Colors para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuración
SERVICE_NAME="panaderia-seminario-front"
REGION="us-central1"

# Verificar argumentos
if [ $# -eq 0 ]; then
    echo -e "${RED}Error: Debes proporcionar el PROJECT_ID${NC}"
    echo "Uso: $0 <PROJECT_ID>"
    exit 1
fi

PROJECT_ID=$1

echo -e "${YELLOW}🚀 Iniciando deploy de Panadería Seminario Front...${NC}"
echo -e "${YELLOW}📋 Proyecto: $PROJECT_ID${NC}"
echo -e "${YELLOW}🌍 Región: $REGION${NC}"
echo -e "${YELLOW}🏷️  Servicio: $SERVICE_NAME${NC}"
echo ""
echo ""

# Verificar que gcloud esté instalado
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Google Cloud SDK no está instalado${NC}"
    echo "Instala gcloud desde: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Verificar que Docker esté corriendo
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker no está corriendo${NC}"
    exit 1
fi

# Configurar proyecto
echo -e "${YELLOW}⚙️  Configurando proyecto...${NC}"
gcloud config set project $PROJECT_ID

# Habilitar APIs necesarias
echo -e "${YELLOW}� Habilitando APIs necesarias...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build y deploy usando Cloud Build
echo -e "${YELLOW}🏗️  Construyendo y desplegando con Cloud Build...${NC}"
gcloud builds submit --config cloudbuild.yaml

# Obtener URL del servicio
echo -e "${YELLOW}🔍 Obteniendo URL del servicio...${NC}"
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo ""
echo -e "${GREEN}✅ Deploy completado exitosamente!${NC}"
echo -e "${GREEN}🌐 URL de la aplicación: $SERVICE_URL${NC}"
echo ""
echo -e "${YELLOW}📝 Comandos útiles:${NC}"
echo "  Ver logs:    gcloud logging read \"resource.type=cloud_run_revision AND resource.labels.service_name=$SERVICE_NAME\" --limit=50"
echo "  Ver servicio: gcloud run services describe $SERVICE_NAME --region=$REGION"
echo "  Eliminar:    gcloud run services delete $SERVICE_NAME --region=$REGION"
# docker tag panaderia-delicias your-registry.com/panaderia-delicias
# docker push your-registry.com/panaderia-delicias

echo "✅ Deployment ready!"
echo ""
echo "🌐 Available commands:"
echo "  Local:     docker run -p 3000:3000 panaderia-delicias"
echo "  Dev mode:  npm run dev"
echo "  Build:     npm run build"
