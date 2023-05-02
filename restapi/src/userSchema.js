"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    userWebId: {
        type: String,
        required: false,
    },
    provider: {
        type: String,
        required: true,
    },
});
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
