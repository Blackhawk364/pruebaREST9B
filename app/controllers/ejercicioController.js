
const ejercicioModel = require('../models/EjerciciosModel'); // Ruta a tu modelo

function buscarTodo(req, res) {
    ejercicioModel.find({})
        .then(ejercicios => {

            if (ejercicios.length > 0) {
                return res.status(200).send({ ejercicios });
            } else {

                return res.status(204).send();

            }
        })
        .catch(error => {
   
            console.error("Error al buscar ejercicios:", error); // **MUY IMPORTANTE: revisa tu consola del servidor**
            return res.status(500).send({ mensaje: `ERROR DE CONSULTA: ${error.message || error}` });
        });
}

module.exports = {
    buscarTodo
};
