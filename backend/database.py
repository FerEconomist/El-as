import mysql.connector
from mysql.connector import Error

class ConexionDB:
    def __init__(
        self,
        host: str = "localhost",
        user: str = "root",
        password: str = "Yboadzk4",
        database: str = "presupuesto_elias"
    ):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    def conectar(self):
        try:
            conn = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            return conn

        except Error as err:
            print(f"Error de conexión: {err}")
            return None

