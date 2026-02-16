# =========================================================
# IMPORTS
# =========================================================

from fastapi import APIRouter, HTTPException, status
from typing import List

from backend.crud.pies_presupuesto import PiesPresupuestoCRUD

from backend.models.pies_presupuesto import (
    PiePresupuestoCreate,
    PiePresupuestoUpdate,
    PiePresupuestoOut
)


# =========================================================
# ROUTER
# =========================================================

router = APIRouter(
    prefix="/pies_presupuesto",
    tags=["PiesPresupuesto"]
)

pies_crud = PiesPresupuestoCRUD()


# =========================================================
# GET ALL
# =========================================================

@router.get("/", response_model=List[PiePresupuestoOut])
def obtener_pies():
    return pies_crud.obtener_todos()


# =========================================================
# GET BY ID
# =========================================================

@router.get("/{id_pie}", response_model=PiePresupuestoOut)
def obtener_pie(id_pie: int):
    pie = pies_crud.obtener_por_id(id_pie)
    if not pie:
        raise HTTPException(status_code=404, detail="Pie no encontrado")
    return pie


# =========================================================
# POST
# =========================================================

@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=PiePresupuestoOut
)
def crear_pie(pie: PiePresupuestoCreate):
    nuevo = pies_crud.crear(pie)
    if not nuevo:
        raise HTTPException(status_code=500, detail="No se pudo crear")
    return nuevo


# =========================================================
# PUT
# =========================================================

@router.put("/{id_pie}", response_model=PiePresupuestoOut)
def actualizar_pie(id_pie: int, pie: PiePresupuestoUpdate):
    actualizado = pies_crud.actualizar(id_pie, pie)
    if not actualizado:
        raise HTTPException(status_code=404, detail="Pie no encontrado")
    return actualizado


# =========================================================
# DELETE
# =========================================================

@router.delete("/{id_pie}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_pie(id_pie: int):
    eliminado = pies_crud.eliminar(id_pie)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Pie no encontrado")
    return None
