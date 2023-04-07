import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        userWebId: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
    }
)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = model("User", userSchema);

export default User;