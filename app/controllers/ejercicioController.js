const EjerciciosModel = require("../models/EjerciciosModel");

function BuscarTodo(req, res) {
  EjerciciosModel.find({})
    .then((ejercicios) => {
      if (ejercicios.length) {
        return res.status(200).send({ ejercicios });
      }
      return res.status(204).send({
        message: "no hay info",
      });
    })
    .catch((err) => {
      return res.status(404).send({
        message: `no jala la consulta: ${err}`,
      });
    });
}

function GuardarEjercicio(req, res) {
  console.log(req.body);
  new EjerciciosModel(req.body)
    .save()
    .then((info) => {
      return res.status(200).send({
        message: "info guardada",
        info,
      });
    })
    .catch((err) => {
      return res.status(404).send({
        message: `info no guardada: ${err}`,
      });
    });
}

function BuscarEjercicio(req, res, next) {
  const consulta = {};
  consulta[req.params.key] = req.params.valor;
  EjerciciosModel.findOne(consulta) // Changed from find to findOne
    .then((info) => {
      if (!info) {
        // If no document found, info will be null
        return next();
      }
      req.body = req.body || {};
      req.body.ejercicios = info; // info is now a single document
      return next();
    })
    .catch((err) => {
      req.body = req.body || {};
      req.body.err = err;
      next();
    });
}

function mostrarEjercicio(req, res) {
  if (req.body.err)
    return res.status(404).send({
      message: `no jala la busqueda`,
      error: req.body.err,
    });
  if (!req.body.ejercicios)
    return res.status(204).send({
      message: "no hay info",
    });
  const ejercicio = req.body.ejercicios;
  return res.status(200).send({ ejercicio });
}

function eliminarEjercicio(req, res) {
  if (req.body.err)
    return res.status(404).send({
      message: `no jala la busqueda`,
      error: req.body.err,
    });
  if (!req.body.ejercicios)
    return res.status(204).send({
      message: "no hay info",
    });

  req.body.ejercicios
    .deleteOne()
    .then((info) => {
      return res.status(200).send({
        message: "ejercicio eliminado",
        info,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: `ejercicio no eliminado`,
        err,
      });
    });
}

function actualizarEjercicio(req, res) {
  if (req.body.err) {
    return res.status(404).send({
      message: `no se encontró el ejercicio para actualizar`,
      error: req.body.err,
    });
  }
  if (!req.body.ejercicios) {
    return res.status(204).send({
      message: "no hay info para actualizar",
    });
  }

  // Los datos a actualizar se espera que vengan en req.body
  // Se asume que req.body.ejercicios ya contiene el ejercicio encontrado por BuscarEjercicio
  Object.assign(req.body.ejercicios, req.body);

  req.body.ejercicios
    .save()
    .then((info) => {
      return res.status(200).send({
        message: "ejercicio actualizado",
        info,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: `no se pudo actualizar el ejercicio`,
        err,
      });
    });
}

module.exports = {
  BuscarTodo,
  GuardarEjercicio,
  BuscarEjercicio,
  mostrarEjercicio,
  eliminarEjercicio,
  actualizarEjercicio
};