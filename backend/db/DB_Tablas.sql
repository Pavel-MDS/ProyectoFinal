USE ferre_corp;

-- 1. Usuarios (Clientes)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Emprendimientos (Negocios)
CREATE TABLE emprendimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_negocio VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    contacto VARCHAR(50),
    direccion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tipos de Producto (guantes, cascos, etc.)
CREATE TABLE tipos_producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- 4. Productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    descripcion TEXT,
    unidades_disponibles INT DEFAULT 0,
    imagen_url TEXT,
    tipo_producto_id INT,
    emprendimiento_id INT,
    FOREIGN KEY (tipo_producto_id) REFERENCES tipos_producto(id),
    FOREIGN KEY (emprendimiento_id) REFERENCES emprendimientos(id)
);

-- 5. Servicios
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion_corta TEXT,
    descripcion_detallada TEXT,
    horario VARCHAR(100),
    contacto VARCHAR(50),
    imagen_url TEXT,
    emprendimiento_id INT,
    FOREIGN KEY (emprendimiento_id) REFERENCES emprendimientos(id)
);

-- 6. Venta de Productos
CREATE TABLE ventas_productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    total DECIMAL(10,2),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- 7. Venta de Servicios
CREATE TABLE ventas_servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    servicio_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);
-- 8
CREATE TABLE reseñas_productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    producto_id INT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
-- 9
CREATE TABLE reseñas_servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    servicio_id INT,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);
-- 10
CREATE TABLE favoritos_usuarios_productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    producto_id INT,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, producto_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- 11
CREATE TABLE favoritos_usuarios_servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    servicio_id INT,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, servicio_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);

