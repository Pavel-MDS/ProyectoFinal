const Servicio = require('../models/servicio.model');

// Obtener todos los servicios
const listarServicios = (req, res) => {
  Servicio.obtenerServicios((err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los servicios' });
    res.json(resultados);
  });
};

// Obtener servicio por ID
const obtenerServicio = (req, res) => {
  const id = req.params.id;
  Servicio.obtenerServicioPorId(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el servicio' });
    if (resultado.length === 0) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(resultado[0]);
  });
};

// Crear servicio
const crearServicio = (req, res) => {
  const datos = req.body;
  Servicio.crearServicio(datos, (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al crear el servicio' });
    res.status(201).json({ mensaje: 'Servicio creado', id: resultado.insertId });
  });
};

module.exports = {
  listarServicios,
  obtenerServicio,
  crearServicio
};
