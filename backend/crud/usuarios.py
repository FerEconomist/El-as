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
    def crear(self, usuario):
        """
        🧠 Notas importantes:
        - usuario es un modelo Pydantic (UsuarioCreate)
        - Por eso se accede con atributos: usuario.nombre, usuario.apellido, etc.
        - Hacemos INSERT y luego SELECT para devolver el registro completo
        """
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
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        params = (
            usuario.nombre,
            usuario.apellido,
            usuario.profesion_oficio,
            usuario.empresa,
            usuario.telefono,
            usuario.telefono_alt,
            str(usuario.email) if usuario.email else None,  # EmailStr -> str
            usuario.cuil_cuit,
        )

        new_id, _ = self._ejecutar(sql, params)
        return self.obtener_por_id(new_id)

    # =========================
    # ACTUALIZAR
    # =========================
    def actualizar(self, id_usuario: int, usuario_update):
        """
        🧠 Notas importantes:
        - usuario_update es un Pydantic model (UsuarioUpdate), NO dict.
        - Convertimos a dict SOLO con campos que vinieron en el body.
        """
        data = usuario_update.model_dump(exclude_unset=True)

        if not data:
            # no vino ningún campo para actualizar
            return None

        # Construimos SQL dinámico: solo actualiza campos enviados
        set_parts = []
        params = []

        for campo, valor in data.items():
            set_parts.append(f"{campo} = %s")
            # EmailStr a str
            if campo == "email" and valor is not None:
                valor = str(valor)
            params.append(valor)

        sql = f"""
        UPDATE usuario SET
            {", ".join(set_parts)}
        WHERE id_usuario = %s
        """
        params.append(id_usuario)

        _, rowcount = self._ejecutar(sql, tuple(params))
        if rowcount == 0:
            return None

        return self.obtener_por_id(id_usuario)

    # =========================
    # ELIMINAR
    # =========================
    def eliminar(self, id_usuario: int):
        sql = "DELETE FROM usuario WHERE id_usuario = %s"
        _, rowcount = self._ejecutar(sql, (id_usuario,))
        return rowcount > 0
