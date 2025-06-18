const app = require('./app/app')
const config = require('./app/config/configuracion')


app.listen(config.PORT,()=>{
    console.log("APP CORRIENDO EN PUERTO",config.PORT);
})

