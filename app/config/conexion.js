const mongoose = require('mongoose')
const config = require ('./configuracion')
module.exports ={
    connecction : null,
    connect : ()=>{
        if(this.connection) return this.connecction
        return mongoose.connect(config.DB)
        .then(conn =>{
            this.connecction = conn
            console.log('Conectado a la base de datos');
        })
        .catch(e =>{console.log('error en la conexion',e)})
    }

}
