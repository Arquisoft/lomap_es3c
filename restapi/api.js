"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSchema_1 = __importDefault(require("./src/userSchema"));
const solicitudeSchema_1 = __importDefault(require("./src/solicitudeSchema"));
const mongoose = require('mongoose');
const api = express_1.default.Router();
// BBDD Conf 5/6 - Método que implementa el GET/POST
// IMPLEMENTAR MÉTODOS
api.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json();
}));
api.get("/user/isRegistered", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.query.userName;
        const userWebId = req.query.userWebId;
        const provider = req.query.provider;
        const user = yield userSchema_1.default.findOne({ userName: userName === null || userName === void 0 ? void 0 : userName.toString(), userWebId: userWebId === null || userWebId === void 0 ? void 0 : userWebId.toString(), provider: provider === null || provider === void 0 ? void 0 : provider.toString() });
        if (user) {
            return res.status(200).send({ isRegistered: true });
        }
        else {
            return res.status(200).send({ isRegistered: false });
        }
    }
    catch (error) {
        return res.status(500).send({ error: 'Error al buscar usuario' });
    }
}));
api.post("/user/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Hacer la llamada
    let userName = req.body.userName;
    let userWebId = req.body.userWebId;
    let provider = req.body.provider;
    const userData = new userSchema_1.default({ userName: userName, userWebId: userWebId, provider: provider });
    // Insertar el usuario en la base de datos
    yield userData.save();
    // Manejar el retorno
    return res.status(200).send({ added: true });
}));
api.get("/user/exists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.query.userName;
        const provider = req.query.provider;
        const user = yield userSchema_1.default.findOne({ userName: userName === null || userName === void 0 ? void 0 : userName.toString(), provider: provider === null || provider === void 0 ? void 0 : provider.toString() });
        if (user) {
            return res.status(200).send({ exists: true });
        }
        else {
            return res.status(200).send({ exists: false });
        }
    }
    catch (error) {
        return res.status(500).send({ error: 'Error al buscar usuario' });
    }
}));
api.get("/solicitude/exists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receiverName = req.query.receiverName;
        const receiverProvider = req.query.receiverProvider;
        const senderName = req.query.senderName;
        const senderProvider = req.query.senderProvider;
        const solicitude = yield solicitudeSchema_1.default.findOne({ senderName: senderName === null || senderName === void 0 ? void 0 : senderName.toString(), senderProvider: senderProvider === null || senderProvider === void 0 ? void 0 : senderProvider.toString(), receiverName: receiverName === null || receiverName === void 0 ? void 0 : receiverName.toString(), receiverProvider: receiverProvider === null || receiverProvider === void 0 ? void 0 : receiverProvider.toString() });
        if (solicitude) {
            return res.status(200).send({ exists: true });
        }
        else {
            return res.status(200).send({ exists: false });
        }
    }
    catch (error) {
        return res.status(500).send({ error: 'Error al buscar solicitud' });
    }
}));
api.post("/solicitude/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Hacer la llamada
    let senderName = req.body.senderName;
    let senderProvider = req.body.senderProvider;
    let receiverName = req.body.receiverName;
    let receiverProvider = req.body.receiverProvider;
    const solicitudeData = new solicitudeSchema_1.default({ senderName: senderName, senderProvider: senderProvider, receiverName: receiverName, receiverProvider: receiverProvider });
    // Insertar la solicitud en la base de datos
    yield solicitudeData.save();
    // Manejar el retorno
    return res.status(200).send({ added: true });
}));
api.get("/solicitude/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receiverName = req.query.userName;
        const receiverProvider = req.query.provider;
        const solicitudes = yield solicitudeSchema_1.default.find({ receiverName: receiverName === null || receiverName === void 0 ? void 0 : receiverName.toString(), receiverProvider: receiverProvider === null || receiverProvider === void 0 ? void 0 : receiverProvider.toString() });
        return res.status(200).send({ solicitudes: solicitudes });
    }
    catch (error) {
        return res.status(500).send({ error: 'Error al buscar solicitud' });
    }
}));
api.post("/solicitude/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Hacer la llamada
    let senderName = req.body.senderName;
    let senderProvider = req.body.senderProvider;
    let receiverName = req.body.receiverName;
    let receiverProvider = req.body.receiverProvider;
    yield solicitudeSchema_1.default.deleteOne({ senderName: senderName.toString(), senderProvider: senderProvider.toString(), receiverName: receiverName.toString(), receiverProvider: receiverProvider.toString() });
    // Manejar el retorno
    return res.status(200).send({ deleted: true });
}));
api.post("/user/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Hacer la llamada
    let userWebId = req.body.userWebId;
    yield userSchema_1.default.deleteOne({ userWebId: userWebId.toString() });
    // Manejar el retorno
    return res.status(200).send({ deleted: true });
}));
exports.default = api;
