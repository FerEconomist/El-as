# =========================================================
# IMPORTS
# =========================================================

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# =========================================================
# CREATE
# =========================================================

class PiePresupuestoCreate(BaseModel):
    id_presupuesto: Optional[int] = None
    titulo: str
    texto: str


# =========================================================
# UPDATE
# =========================================================

class PiePresupuestoUpdate(BaseModel):
    id_presupuesto: Optional[int] = None
    titulo: Optional[str] = None
    texto: Optional[str] = None


# =========================================================
# OUT
# =========================================================

class PiePresupuestoOut(BaseModel):
    id_pie: int
    id_presupuesto: Optional[int]
    titulo: str
    texto: str
    created_at: datetime
    updated_at: datetime
