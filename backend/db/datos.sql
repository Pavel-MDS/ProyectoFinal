USE ferre_corp;

-- Tipos de producto
INSERT INTO tipos_producto (nombre) VALUES
  ('Guantes'),    
  ('Cascos'),     
  ('Chalecos'),   
  ('Botas');      

--  Usuarios 
INSERT INTO usuarios (nombre, correo, contrasena) VALUES 
  ('Juan Pérez',   'juan.perez@email.com',    SHA2('cliente123',256)),
  ('María García', 'maria.garcia@email.com',  SHA2('cliente456',256)),
  ('Carlos López', 'carlos.lopez@email.com',  SHA2('cliente789',256)),
  ('Ana Martínez','ana.martinez@email.com',  SHA2('cliente012',256));

-- Emprendimientos
INSERT INTO emprendimientos (nombre_negocio, correo, contrasena, contacto, direccion) VALUES
  ('Ferretería El Constructor', 'elconstructor@email.com', SHA2('ferre123',256), '987654321', 'Av. Principal 123, Lima'),
  ('Ferretería La Económica',   'laeconomica@email.com',   SHA2('ferre456',256), '987654322', 'Calle Comercio 456, Lima'),
  ('Ferretería Todo en Casa',   'todoencasa@email.com',    SHA2('ferre789',256), '987654323', 'Jr. Industrial 789, Lima');

--  Productos
INSERT INTO productos (nombre, precio, descripcion, unidades_disponibles, imagen_url, tipo_producto_id, emprendimiento_id) VALUES
    -- Guantes
  ('Guantes', 12.80, 'Guante versión 1', 50, '/img/guantes_1.png', 1, 2),
  ('Guantes', 12.80, 'Guante versión 2', 50, '/img/guantes_2.png', 1, 2),
  ('Guantes', 12.80, 'Guante versión 3', 50, '/img/guantes_3.png', 1, 2),
  ('Guantes', 12.80, 'Guante versión 4', 50, '/img/guantes_4.png', 1, 2),
  ('Botas', 55.00, 'Bota versión 1', 40, '/img/botas_1.jpg', 4, 2),
  ('Botas', 55.00, 'Bota versión 2', 40, '/img/botas_2.png', 4, 2),
  ('Botas', 55.00, 'Bota versión 3', 40, '/img/botas_3.png', 4, 2),
  ('Botas', 55.00, 'Bota versión 4', 40, '/img/botas_4.png', 4, 2),
  ('Chaleco', 18.50, 'Chaleco versión 1', 60, '/img/chalecos_1.png', 3, 3),
  ('Chaleco', 18.50, 'Chaleco versión 2', 60, '/img/chalecos_2.png', 3, 3),
  ('Chaleco', 18.50, 'Chaleco versión 3', 60, '/img/chalecos_3.png', 3, 3),
  ('Chaleco', 18.50, 'Chaleco versión 4', 60, '/img/chalecos_4.png', 3, 3),
  ('Casco', 15.30, 'Casco versión estándar', 80, '/img/casco.jpg',       2, 1),
  ('Casco', 15.30, 'Casco versión Seg',      80, '/img/cascoSeg.jpg',    2, 1),
  ('Casco', 15.30, 'Casco Azul',             80, '/img/casco_azul.png',  2, 1),
  ('Casco', 15.30, 'Casco Naranja',          80, '/img/casco_naranja.png',2, 1);

-- Servicios
INSERT INTO servicios (
  nombre,
  descripcion_corta,
  descripcion_detallada,
  horario,
  contacto,
  imagen_url,
  emprendimiento_id
) VALUES
  ('Reparación de herramientas', 'Servicio técnico para herramientas', 'Diagnóstico y reparación de herramientas manuales y eléctricas', 'L-V 9am-6pm', '987654321 ext.2', '/img/reparacion_herramientas.png', 1),
  ('Corte de materiales',       'Corte preciso de madera, metal y PVC', 'Servicio de corte a medida con equipos profesionales', 'L-S 8am-8pm',     '987654322 ext.3', '/img/corte_material.png', 2),
  ('Asesoría técnica',          'Asesoramiento profesional para proyectos', 'Consultoría en construcción y remodelación', 'L-V 10am-5pm', '987654323 ext.4', '/img/accesoria_tecnica.png', 3),
  ('Instalación eléctrica',     'Instalación y reparación de sistemas eléctricos', 'Instalación completa para viviendas y locales', 'L-S 9am-7pm', '987654321 ext.5', '/img/instalacion_electrica.png', 1);

-- Ventas de productos 
INSERT INTO ventas_productos (usuario_id, producto_id, cantidad, total) VALUES
  (1, 1, 2, 25.60),   -- Juan compra 2 guantes
  (2, 2, 1, 15.30),   -- María compra 1 casco
  (3, 3, 3, 55.50),   -- Carlos compra 3 chalecos
  (4, 4, 1, 55.00);   -- Ana compra 1 par de botas

--  Ventas de servicios
INSERT INTO ventas_servicios (usuario_id, servicio_id) VALUES
  (1, 1),
  (2, 3),
  (3, 2),
  (4, 4);

-- Reseñas de productos 
INSERT INTO reseñas_productos (usuario_id, producto_id, calificacion, comentario) VALUES
  (1, 1, 5, 'Excelentes guantes, muy resistentes'),
  (2, 2, 4, 'Casco cómodo, ajuste perfecto'),
  (3, 3, 5, 'Chaleco muy visible y ligero'),
  (4, 4, 4, 'Botas muy cómodas, buen agarre');

-- Reseñas de servicios
INSERT INTO reseñas_servicios (usuario_id, servicio_id, calificacion, comentario) VALUES
  (1, 1, 5, 'Repararon mi taladro rápido'),
  (2, 3, 4, 'Buena asesoría para mi remodelación'),
  (3, 2, 5, 'Corte perfecto, justo a medida'),
  (4, 4, 3, 'Instalación bien hecha, un poco costosa');

-- Favoritos de productos
INSERT INTO favoritos_usuarios_productos (usuario_id, producto_id) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (3, 4);

-- Favoritos de servicios
INSERT INTO favoritos_usuarios_servicios (usuario_id, servicio_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4);
  
  USE ferre_corp;


