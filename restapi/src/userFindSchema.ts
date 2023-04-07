import { model, Schema } from 'mongoose';

const userFindSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
    }
)

userFindSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const UserFind = model("UserFind", userFindSchema);

export default UserFind;