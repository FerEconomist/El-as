# =========================
# IMPORTS
# =========================

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# =========================================================
# MODELO: UsuarioCreate
# Se usa cuando el FRONTEND ENVÍA datos (POST)
# =========================================================
class UsuarioCreate(BaseModel):
    nombre: str
    apellido: str

    profesion_oficio: Optional[str] = None
    empresa: Optional[str] = None
    telefono: Optional[str] = None
    telefono_alt: Optional[str] = None
    email: Optional[EmailStr] = None
    cuil_cuit: Optional[str] = None

    # 🧠 Notas importantes:
    # - nombre y apellido → obligatorios (como en SQL: NOT NULL)
    # - Optional[...] → coincide con columnas que permiten NULL
    # - EmailStr → valida automáticamente formato de email
    # - No hay id_usuario → lo genera MySQL (AUTO_INCREMENT)
    # - No hay created_at / updated_at → los maneja la base


# =========================================================
# MODELO: UsuarioUpdate
# Se usa cuando el FRONTEND ACTUALIZA datos (PUT / PATCH)
# =========================================================
class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    profesion_oficio: Optional[str] = None
    empresa: Optional[str] = None
    telefono: Optional[str] = None
    telefono_alt: Optional[str] = None
    email: Optional[EmailStr] = None
    cuil_cuit: Optional[str] = None

    # 🧠 Notas importantes:
    # - Todos los campos son Optional
    # - Permite actualizar solo uno o varios campos
    # - FastAPI valida solo lo que venga en el body
    # - Ideal para edición parcial (formularios)


# =========================================================
# MODELO: UsuarioOut
# Se usa cuando el BACKEND DEVUELVE datos (GET)
# =========================================================
class UsuarioOut(BaseModel):
    id_usuario: int
    nombre: str
    apellido: str
    profesion_oficio: Optional[str]
    empresa: Optional[str]
    telefono: Optional[str]
    telefono_alt: Optional[str]
    email: Optional[EmailStr]
    cuil_cuit: Optional[str]

    created_at: datetime
    updated_at: datetime

    # 🧠 Notas importantes:
    # - Representa una fila COMPLETA de la tabla usuario
    # - Se usa para responder al frontend (tabla HTML)
    # - Incluye id_usuario y timestamps
    # - Nunca se usa para INSERT ni UPDATE

