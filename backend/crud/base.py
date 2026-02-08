import mysql.connector
from backend.database import ConexionDB


class BaseCRUD:
    def __init__(self):
        self.db = ConexionDB()

    def _get_connection(self):
        conn = self.db.conectar()
        if conn is None:
            raise RuntimeError("No se pudo conectar a la base de datos")
        return conn

    def _consultar(self, query, params=None, fetch_one=False):
        """
        🧠 Notas importantes:
        - cursor(dictionary=True) devuelve dicts (ideal para FastAPI + response_model)
        - fetch_one: devuelve 1 dict o None
        - fetch_all: devuelve lista de dicts ([])
        """
        with self._get_connection() as conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute(query, params or ())
            if fetch_one:
                return cursor.fetchone()
            return cursor.fetchall()

    def _ejecutar(self, query, params=None):
        """
        🧠 Notas importantes:
        - Devuelve lastrowid para INSERT
        - Devuelve rowcount útil para UPDATE/DELETE
        """
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, params or ())
            conn.commit()
            return cursor.lastrowid, cursor.rowcount
