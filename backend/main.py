# =========================================================
# IMPORTS
# =========================================================

from fastapi import FastAPI

# Routers
from backend.routers.usuarios import router as usuarios_router
# (más adelante: notas_pie, clientes, presupuestos, etc.)
from fastapi.middleware.cors import CORSMiddleware

# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="Presupuesto ELÍAS",
    description="API backend para gestión de usuarios, presupuestos y notas",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # en producción se limita
    allow_credentials=True,
    allow_methods=["*"],      # GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],
)


#=====================================================
# ROUTERS
# =========================================================

app.include_router(usuarios_router)

# =========================================================
# RUTA DE PRUEBA
# =========================================================

@app.get("/")
def root():
    """
    🧠 Endpoint mínimo de prueba
    - Sirve para verificar que la API levanta
    """
    return {"status": "API Presupuesto ELÍAS activa"}
