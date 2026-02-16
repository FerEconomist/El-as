from backend.crud.base import BaseCRUD


class PiesPresupuestoCRUD(BaseCRUD):

    # =========================================================
    # OBTENER TODOS
    # =========================================================
    def obtener_todos(self):
        sql = """
        SELECT
            id_pie,
            id_presupuesto,
            titulo,
            texto,
            created_at,
            updated_at
        FROM pies_presupuesto
        ORDER BY id_pie DESC
        """
        return self._consultar(sql)

    # =========================================================
    # OBTENER POR ID
    # =========================================================
    def obtener_por_id(self, id_pie: int):
        sql = """
        SELECT
            id_pie,
            id_presupuesto,
            titulo,
            texto,
            created_at,
            updated_at
        FROM pies_presupuesto
        WHERE id_pie = %s
        """
        return self._consultar(sql, (id_pie,), fetch_one=True)

    # =========================================================
    # CREAR
    # =========================================================
    def crear(self, pie_create):
        sql = """
        INSERT INTO pies_presupuesto (
            id_presupuesto,
            titulo,
            texto
        )
        VALUES (%s, %s, %s)
        """

        params = (
            pie_create.id_presupuesto,
            pie_create.titulo,
            pie_create.texto
        )

        last_id, _ = self._ejecutar(sql, params)
        return self.obtener_por_id(last_id)

    # =========================================================
    # ACTUALIZAR
    # =========================================================
    def actualizar(self, id_pie: int, pie_update):

        data = pie_update.dict(exclude_unset=True)

        if not data:
            return None

        set_parts = []
        params = []

        for campo, valor in data.items():
            set_parts.append(f"{campo} = %s")
            params.append(valor)

        sql = f"""
        UPDATE pies_presupuesto
        SET {', '.join(set_parts)}
        WHERE id_pie = %s
        """

        params.append(id_pie)

        _, rowcount = self._ejecutar(sql, tuple(params))

        if rowcount == 0:
            return None

        return self.obtener_por_id(id_pie)

    # =========================================================
    # ELIMINAR
    # =========================================================
    def eliminar(self, id_pie: int):
        sql = "DELETE FROM pies_presupuesto WHERE id_pie = %s"
        _, rowcount = self._ejecutar(sql, (id_pie,))
        return rowcount > 0
