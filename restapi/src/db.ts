import mongoose from "mongoose";

const uri = "mongodb+srv://dbManager:1234@lomap-es3c-db.gfgwc7j.mongodb.net/?retryWrites=true&w=majority";

// BBDD Conf 1/6 - Establecer conexión con la BBDD
mongoose.connect(uri)
    .then(() => {
        console.log("Conexión correcta con la BD")
    })
    .catch((err) => {
        console.error("Error de conexión: " + err)
    });