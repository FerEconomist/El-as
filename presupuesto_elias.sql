CREATE DATABASE IF NOT EXISTS presupuesto_elias
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE presupuesto_elias;

-- =========================================================
-- 0) USUARIO
-- =========================================================
CREATE TABLE IF NOT EXISTS usuario_unico (
  id_usuario      INT AUTO_INCREMENT PRIMARY KEY,
  nombre          VARCHAR(80) NOT NULL,
  apellido        VARCHAR(80) NOT NULL,
  empresa         VARCHAR(120),
  telefono        VARCHAR(30),
  email           VARCHAR(150),

  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
                  ON UPDATE CURRENT_TIMESTAMP
);


-- =========================================================
-- 1) CLIENTES
-- =========================================================
CREATE TABLE IF NOT EXISTS clientes (
  id_cliente      INT AUTO_INCREMENT PRIMARY KEY,
  nombre          VARCHAR(80) NOT NULL,
  apellido        VARCHAR(80) NOT NULL,
  empresa         VARCHAR(120),
  telefono        VARCHAR(30),
  email           VARCHAR(150),

  calle           VARCHAR(120),
  numero          VARCHAR(20),
  piso            VARCHAR(20),
  barrio          VARCHAR(80),
  localidad       VARCHAR(80),

  activo          TINYINT(1) DEFAULT 1,

  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
                  ON UPDATE CURRENT_TIMESTAMP
);

-- =========================================================
-- CAMPOS PERSONALIZADOS DEL CLIENTE
-- =========================================================
CREATE TABLE IF NOT EXISTS cliente_campos (
  id_campo        INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente      INT NOT NULL,

  nombre_campo    VARCHAR(80) NOT NULL,
  valor_campo     VARCHAR(255) NOT NULL,

  CONSTRAINT fk_cliente_campos_cliente
    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente)
    ON DELETE CASCADE
);

-- =========================================================
-- 2) PRESUPUESTOS
-- =========================================================
CREATE TABLE IF NOT EXISTS presupuestos (
  id_presupuesto     INT AUTO_INCREMENT PRIMARY KEY,

  numero             VARCHAR(30) NOT NULL,
  titulo             VARCHAR(160) NOT NULL,
  descripcion        TEXT,

  fecha_emision      DATE NOT NULL,
  fecha_finalizacion DATE,

  estado             ENUM('abierto','en_proceso','finalizado','aprobado','rechazado')
                     DEFAULT 'abierto',

  id_cliente         INT,

  created_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at         DATETIME DEFAULT CURRENT_TIMESTAMP
                      ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_presupuestos_cliente
    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente)
    ON DELETE SET NULL
);

-- =========================================================
-- 2b) ÍTEMS DEL PRESUPUESTO
-- =========================================================
CREATE TABLE IF NOT EXISTS presupuesto_items (
  id_item           INT AUTO_INCREMENT PRIMARY KEY,
  id_presupuesto    INT NOT NULL,

  detalle           VARCHAR(200) NOT NULL,
  cantidad          DECIMAL(10,2) NOT NULL,
  precio_unitario   DECIMAL(12,2) NOT NULL,
  iva_pct           TINYINT NOT NULL,

  CONSTRAINT fk_items_presupuesto
    FOREIGN KEY (id_presupuesto)
    REFERENCES presupuestos(id_presupuesto)
    ON DELETE CASCADE
);

-- =========================================================
-- 3) PIES DEL PRESUPUESTO (PLANTILLAS / APLICADOS)
-- =========================================================
CREATE TABLE IF NOT EXISTS pies_presupuesto (
  id_pie            INT AUTO_INCREMENT PRIMARY KEY,

  id_presupuesto    INT NULL,        -- NULL = plantilla reutilizable
  titulo            VARCHAR(120) NOT NULL,
  texto             TEXT NOT NULL,
  es_plantilla      TINYINT(1) DEFAULT 0,

  CONSTRAINT fk_pies_presupuesto_presupuesto
    FOREIGN KEY (id_presupuesto)
    REFERENCES presupuestos(id_presupuesto)
    ON DELETE SET NULL
);

-- =========================================================
-- 4) NOTAS
-- =========================================================
CREATE TABLE IF NOT EXISTS notas (
  id_nota         INT AUTO_INCREMENT PRIMARY KEY,

  titulo          VARCHAR(160) NOT NULL,
  contenido       TEXT NOT NULL,
  fecha           DATETIME DEFAULT CURRENT_TIMESTAMP,

  id_cliente      INT NULL,
  id_presupuesto  INT NULL,

  CONSTRAINT fk_notas_cliente
    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente)
    ON DELETE SET NULL,

  CONSTRAINT fk_notas_presupuesto
    FOREIGN KEY (id_presupuesto)
    REFERENCES presupuestos(id_presupuesto)
    ON DELETE SET NULL
);