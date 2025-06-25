const db = require('../db/connection');

// Obtener todos los productos con su tipo y emprendimiento
const obtenerProductos = (callback) => {
  db.query(`
    SELECT p.*, t.nombre AS tipo_nombre, e.nombre_negocio, e.contacto
    FROM productos p
    LEFT JOIN tipos_producto t ON p.tipo_producto_id = t.id
    LEFT JOIN emprendimientos e ON p.emprendimiento_id = e.id
  `, callback);
};

// Insertar producto
const crearProducto = (datos, callback) => {
  const {
    nombre, precio, descripcion, unidades_disponibles, imagen_url,
    tipo_producto_id, emprendimiento_id
  } = datos;

  db.query(
    `INSERT INTO productos 
     (nombre, precio, descripcion, unidades_disponibles, imagen_url, tipo_producto_id, emprendimiento_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, precio, descripcion, unidades_disponibles, imagen_url, tipo_producto_id, emprendimiento_id],
    callback
  );
};

// Obtener un producto por ID
const obtenerProductoPorId = (id, callback) => {
  db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
};

module.exports = {
  obtenerProductos,
  crearProducto,
  obtenerProductoPorId
};
