import mysql.connector
from backend.database import ConexionDB


class BaseCRUD:
    def __init__(self):
        self.db = ConexionDB()

    def _get_connection(self):
        return self.db.conectar()

    def _consultar(self, query, params=None, fetch_one=False):
        try:
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, params or ())
                    if fetch_one:
                        return cursor.fetchone()
                    return cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error al consultar la base de datos: {err}")
            return None

    def _ejecutar(self, query, params=None):
        try:
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, params or ())
                    conn.commit()
        except mysql.connector.Error as err:
            print(f"Error al ejecutar consulta: {err}")
            return None
