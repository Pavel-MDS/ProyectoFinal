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
    nombre, precio, descripcion, unidades_disponibles,
    imagen_url, tipo_producto_id, emprendimiento_id
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
  db.query(`
    SELECT p.*, t.nombre AS tipo_nombre, e.nombre_negocio, e.contacto
    FROM productos p
    LEFT JOIN tipos_producto t ON p.tipo_producto_id = t.id
    LEFT JOIN emprendimientos e ON p.emprendimiento_id = e.id
    WHERE p.id = ?
  `, [id], callback);
};
//acualizar producto
const actualizarProducto = (id, datos, callback) => {
  const {
    nombre, precio, descripcion, unidades_disponibles,
    imagen, categoria
  } = datos;

  // Obtener tipo_producto_id desde el texto
  db.query('SELECT id FROM tipos_producto WHERE LOWER(nombre) = ?', [categoria.toLowerCase()], (err, rows) => {
    if (err) return callback(err);
    if (rows.length === 0) return callback(new Error('Categoría inválida'));

    const tipo_producto_id = rows[0].id;

    db.query(
      `UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, unidades_disponibles = ?, imagen_url = ?, tipo_producto_id = ? WHERE id = ?`,
      [nombre, precio, descripcion, unidades_disponibles, imagen, tipo_producto_id, id],
      callback
    );
  });
};

const eliminarProducto = (id, callback) => {
  db.query(`DELETE FROM productos WHERE id = ?`, [id], callback);
};

module.exports = {
  obtenerProductos,
  crearProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
};




