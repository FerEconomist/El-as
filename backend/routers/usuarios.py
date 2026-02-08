# =========================================================
# IMPORTS
# =========================================================

from fastapi import APIRouter, HTTPException, status
from typing import List

# CRUD
from backend.crud.usuarios import UsuariosCRUD

# MODELOS PYDANTIC
from backend.models.usuarios import (
    UsuarioCreate,
    UsuarioUpdate,
    UsuarioOut
)

# =========================================================
# ROUTER
# =========================================================

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)

# Instancia del CRUD
usuarios_crud = UsuariosCRUD()

# =========================================================
# GET /usuarios
# Devuelve TODOS los usuarios
# =========================================================
@router.get("/", response_model=List[UsuarioOut])
def obtener_usuarios():
    """
    🧠 Qué hace:
    - Llama al CRUD
    - Obtiene todas las filas de la tabla usuario
    - Las devuelve validadas por UsuarioOut

    🧠 Por qué response_model:
    - FastAPI valida la salida
    - Documenta automáticamente el endpoint
    - El frontend recibe siempre datos consistentes
    """
    usuarios = usuarios_crud.obtener_todos()
    return usuarios


# =========================================================
# POST /usuarios
# Crea un nuevo usuario
# =========================================================
@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=UsuarioOut
)
def crear_usuario(usuario: UsuarioCreate):
    """
    🧠 Qué hace:
    - Recibe datos del frontend (JSON)
    - FastAPI valida con UsuarioCreate
    - Inserta en la base de datos
    - Devuelve el usuario creado completo

    🧠 UsuarioCreate:
    - nombre y apellido obligatorios
    - el resto opcional
    """
    nuevo_usuario = usuarios_crud.crear(usuario)

    if not nuevo_usuario:
        raise HTTPException(
            status_code=500,
            detail="No se pudo crear el usuario"
        )

    return nuevo_usuario

@router.put("/{id_usuario}", response_model=UsuarioOut)
def actualizar_usuario(id_usuario: int, usuario: UsuarioUpdate):
    actualizado = usuarios_crud.actualizar(id_usuario, usuario)

    if not actualizado:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado o sin cambios"
        )

    return actualizado


@router.delete("/{id_usuario}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_usuario(id_usuario: int):
    eliminado = usuarios_crud.eliminar(id_usuario)

    if not eliminado:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    return None
