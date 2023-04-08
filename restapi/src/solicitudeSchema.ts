import { model, Schema } from 'mongoose';

const solicitudeSchema = new Schema(
    {
        senderName: {
            type: String,
            required: true,
        },
        senderProvider: {
            type: String,
            required: true,
        },
        receiverName: {
            type: String,
            required: true,
        },
        receiverProvider: {
            type: String,
            required: true,
        },
    }
)

solicitudeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Solicitude = model("Solicitude", solicitudeSchema);

export default Solicitude;