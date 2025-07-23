# Deploy a Google Cloud Run

Este documento explica cómo desplegar la aplicación de Panadería Seminario Front en Google Cloud Run.

## Prerrequisitos

1. **Google Cloud SDK** instalado y configurado
   ```bash
   # Instalar gcloud CLI
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   gcloud init
   ```

2. **Docker** instalado y corriendo
   ```bash
   # Verificar Docker
   docker --version
   docker info
   ```

3. **Proyecto de Google Cloud** creado
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Anota el PROJECT_ID

## Método 1: Deploy Automático (Recomendado)

Usa el script automatizado que configurará todo por ti:

```bash
# Hacer el script ejecutable (solo la primera vez)
chmod +x deploy.sh

# Ejecutar deploy
./deploy.sh TU_PROJECT_ID
```

El script automáticamente:
- ✅ Configura el proyecto
- ✅ Habilita las APIs necesarias
- ✅ Construye la imagen Docker
- ✅ Despliega en Cloud Run
- ✅ Te proporciona la URL final

## Método 2: Deploy Manual

Si prefieres hacer el deploy paso a paso:

### 1. Configurar proyecto
```bash
gcloud config set project TU_PROJECT_ID
```

### 2. Habilitar APIs
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 3. Build y Deploy
```bash
gcloud builds submit --config cloudbuild.yaml
```

### 4. Verificar deployment
```bash
gcloud run services describe panaderia-seminario-front --region=us-central1
```

## Configuración de Cloud Run

La aplicación se despliega con la siguiente configuración:

- **Servicio**: `panaderia-seminario-front`
- **Región**: `us-central1`
- **Puerto**: `3000`
- **Memoria**: `512Mi`
- **CPU**: `1`
- **Instancias máximas**: `10`
- **Instancias mínimas**: `0` (scale to zero)
- **Acceso**: Público (sin autenticación)

## Comandos Útiles

### Ver logs en tiempo real
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=panaderia-seminario-front" --limit=50 --format="table(timestamp,textPayload)"
```

### Ver detalles del servicio
```bash
gcloud run services describe panaderia-seminario-front --region=us-central1
```

### Actualizar configuración
```bash
gcloud run services update panaderia-seminario-front \
  --region=us-central1 \
  --memory=1Gi \
  --cpu=2
```

### Eliminar servicio
```bash
gcloud run services delete panaderia-seminario-front --region=us-central1
```

### Ver todas las revisiones
```bash
gcloud run revisions list --service=panaderia-seminario-front --region=us-central1
```

## Troubleshooting

### Error: "Docker no está corriendo"
```bash
# En macOS
open -a Docker

# En Linux
sudo systemctl start docker
```

### Error: "gcloud no encontrado"
```bash
# Instalar Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### Error: "APIs no habilitadas"
El script las habilita automáticamente, pero puedes hacerlo manualmente:
```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com
```

### Error: "Permisos insuficientes"
```bash
# Autenticarse
gcloud auth login

# Configurar credentials para aplicaciones
gcloud auth application-default login
```

## Costos Estimados

Google Cloud Run cobra por:
- **Requests**: $0.40 por millón de requests
- **CPU**: $0.00002400 por vCPU-segundo
- **Memoria**: $0.00000250 por GiB-segundo
- **Networking**: $0.12 por GB

Para una aplicación de prueba, el costo mensual es típicamente < $1 USD.

## Variables de Entorno

Si necesitas configurar variables de entorno:

```bash
gcloud run services update panaderia-seminario-front \
  --region=us-central1 \
  --set-env-vars="NODE_ENV=production,API_URL=https://tu-api.com"
```

## Dominio Personalizado

Para usar un dominio personalizado:

1. Ve a Cloud Run en la consola
2. Selecciona tu servicio
3. Ve a "Manage Custom Domains"
4. Sigue las instrucciones para verificar tu dominio

## Monitoreo

- **Métricas**: Disponibles en Cloud Monitoring
- **Logs**: Disponibles en Cloud Logging
- **Alertas**: Configura alertas basadas en latencia, errores, etc.

---

## 🚀 ¡Tu aplicación estará disponible en una URL como:
`https://panaderia-seminario-front-[hash]-uc.a.run.app`
