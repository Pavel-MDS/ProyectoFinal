use ferre_corp;

SET SQL_SAFE_UPDATES = 0;

DELETE FROM favoritos_usuarios_servicios;
DELETE FROM favoritos_usuarios_productos;
DELETE FROM reseñas_servicios;
DELETE FROM reseñas_productos;
DELETE FROM ventas_servicios;
DELETE FROM ventas_productos;
DELETE FROM servicios;
DELETE FROM productos;
DELETE FROM emprendimientos;
DELETE FROM usuarios;
DELETE FROM tipos_producto;

SET SQL_SAFE_UPDATES = 1; 


/*
-- 1️⃣ Desactivar temporalmente las restricciones FK
SET FOREIGN_KEY_CHECKS = 0;

-- 2️⃣ Vaciar (TRUNCATE) todas las tablas de datos en orden:
TRUNCATE TABLE favoritos_usuarios_servicios;
TRUNCATE TABLE favoritos_usuarios_productos;
TRUNCATE TABLE reseñas_servicios;
TRUNCATE TABLE reseñas_productos;
TRUNCATE TABLE ventas_servicios;
TRUNCATE TABLE ventas_productos;
TRUNCATE TABLE servicios;
TRUNCATE TABLE productos;
TRUNCATE TABLE emprendimientos;
TRUNCATE TABLE usuarios;
TRUNCATE TABLE tipos_producto;

-- 3️⃣ Reactivar las restricciones FK
SET FOREIGN_KEY_CHECKS = 1;
*/ 
