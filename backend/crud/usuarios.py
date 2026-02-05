from backend.crud.base import BaseCRUD


class UsuariosCRUD(BaseCRUD):
    # =========================
    # OBTENER TODOS
    # =========================
    def obtener_todos(self):
        sql = """
        SELECT
            id_usuario,
            nombre,
            apellido,
            profesion_oficio,
            empresa,
            telefono,
            telefono_alt,
            email,
            cuil_cuit,
            created_at,
            updated_at
        FROM usuario
        ORDER BY id_usuario DESC
        """
        return self._consultar(sql)

    # =========================
    # OBTENER POR ID
    # =========================
    def obtener_por_id(self, id_usuario: int):
        sql = """
        SELECT
            id_usuario,
            nombre,
            apellido,
            profesion_oficio,
            empresa,
            telefono,
            telefono_alt,
            email,
            cuil_cuit,
            created_at,
            updated_at
        FROM usuario
        WHERE id_usuario = %s
        """
        return self._consultar(sql, (id_usuario,), fetch_one=True)

    # =========================
    # CREAR
    # =========================
    def crear(self, data: dict):
        sql = """
        INSERT INTO usuario (
            nombre,
            apellido,
            profesion_oficio,
            empresa,
            telefono,
            telefono_alt,
            email,
            cuil_cuit
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        params = (
            data.get("nombre"),
            data.get("apellido"),
            data.get("profesion_oficio"),
            data.get("empresa"),
            data.get("telefono"),
            data.get("telefono_alt"),
            data.get("email"),
            data.get("cuil_cuit"),
        )
        self._ejecutar(sql, params)

    # =========================
    # ACTUALIZAR
    # =========================
    def actualizar(self, id_usuario: int, data: dict):
        sql = """
        UPDATE usuario SET
            nombre = %s,
            apellido = %s,
            profesion_oficio = %s,
            empresa = %s,
            telefono = %s,
            telefono_alt = %s,
            email = %s,
            cuil_cuit = %s
        WHERE id_usuario = %s
        """
        params = (
            data.get("nombre"),
            data.get("apellido"),
            data.get("profesion_oficio"),
            data.get("empresa"),
            data.get("telefono"),
            data.get("telefono_alt"),
            data.get("email"),
            data.get("cuil_cuit"),
            id_usuario,
        )
        self._ejecutar(sql, params)

    # =========================
    # ELIMINAR
    # =========================
    def eliminar(self, id_usuario: int):
        sql = "DELETE FROM usuario WHERE id_usuario = %s"
        self._ejecutar(sql, (id_usuario,))
