"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const solicitudeSchema = new mongoose_1.Schema({
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
});
solicitudeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Solicitude = (0, mongoose_1.model)("Solicitude", solicitudeSchema);
exports.default = Solicitude;
