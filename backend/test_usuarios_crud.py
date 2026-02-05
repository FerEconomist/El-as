from backend.crud.usuarios import UsuariosCRUD

if __name__ == "__main__":
    crud = UsuariosCRUD()

    print("== CREAR USUARIO ==")
    crud.crear({
        "nombre": "Juan",
        "apellido": "Pérez",
        "profesion_oficio": "Electricista",
        "empresa": "JP Servicios",
        "telefono": "3511234567",
        "telefono_alt": None,
        "email": "juan.perez@email.com",
        "cuil_cuit": "20-12345678-9"
    })

    print("== OBTENER TODOS ==")
    usuarios = crud.obtener_todos()
    for u in usuarios:
        print(u)

    print("== ELIMINAR ÚLTIMO ==")
    if usuarios:
        ultimo_id = usuarios[0][0]  # id_usuario
        crud.eliminar(ultimo_id)
        print(f"Usuario {ultimo_id} eliminado")
