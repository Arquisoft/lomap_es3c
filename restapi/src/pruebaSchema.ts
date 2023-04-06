import { model, Schema } from 'mongoose';

// BBDD Conf 6/6 - Esquema de datos
const pruebaSchema = new Schema(
    {
        data: {
            type: String,
            required: true,
        },
    }
)

pruebaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Prueba = model("Prueba", pruebaSchema);

export default Prueba;