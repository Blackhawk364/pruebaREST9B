const express = require('express');
const router = express.Router();
const EjerciciosController = require('../controllers/ejercicioController');

router.get('/ejercicios', EjerciciosController.BuscarTodo)
.post('/ejercicios', EjerciciosController.GuardarEjercicio)

router.get('/ejercicios/:key/:valor', EjerciciosController.BuscarEjercicio, EjerciciosController.mostrarEjercicio)

router.delete('/ejercicios/:key/:valor', EjerciciosController.BuscarEjercicio, EjerciciosController.eliminarEjercicio)

router.put('/ejercicios/:key/:valor', EjerciciosController.BuscarEjercicio, EjerciciosController.actualizarEjercicio);

module.exports = router