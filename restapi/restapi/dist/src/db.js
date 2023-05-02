"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb+srv://dbManager:1234@lomap-es3c-db.gfgwc7j.mongodb.net/?retryWrites=true&w=majority";
// BBDD Conf 1/6 - Establecer conexión con la BBDD
mongoose_1.default.connect(uri)
    .then(() => {
    console.log("Conexión correcta con la BD");
})
    .catch((err) => {
    console.error("Error de conexión: " + err);
});
