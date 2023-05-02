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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_prom_bundle_1 = __importDefault(require("express-prom-bundle"));
const api_1 = __importDefault(require("../api"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
var server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    require("../src/db");
    const metricsMiddleware = (0, express_prom_bundle_1.default)({ includeMethod: true });
    app.use(metricsMiddleware);
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(api_1.default);
    server = app.listen(5000);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    server.close();
    yield mongoose_1.default.connection.close(); // cierra la conexión al final de las pruebas
}));
describe('Prueba', () => {
    test('Prueba', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/test');
        expect(response.status).toBe(200);
    }));
});
describe('Añadir usuario al sistema', () => {
    test('Usuario añadido', () => __awaiter(void 0, void 0, void 0, function* () {
        let name = "exampleName";
        let webId = "https://exampleName.inrupt.net";
        let prov = "inrupt";
        const response = yield (0, supertest_1.default)(app).post('/user/add').send({ userName: name, userWebId: webId, provider: prov });
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.added).toBe(true);
    }));
});
describe('Comprobar registro de usuario en el sistema', () => {
    test('Usuario registrado', () => __awaiter(void 0, void 0, void 0, function* () {
        let name = "exampleName";
        let webId = "https://exampleName.inrupt.net";
        let prov = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/user/isRegistered?userName=' + name + '&userWebId=' + webId + '&provider=' + prov);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.isRegistered).toBe(true);
    }));
    test('Usuario no registrado', () => __awaiter(void 0, void 0, void 0, function* () {
        let name = "notExampleName";
        let webId = "https://notExampleName.inrupt.net";
        let prov = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/user/isRegistered?userName=' + name + '&userWebId=' + webId + '&provider=' + prov);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.isRegistered).toBe(false);
    }));
});
describe('Comprobar existencia de usuario en el sistema', () => {
    test('Usuario existente', () => __awaiter(void 0, void 0, void 0, function* () {
        let name = "exampleName";
        let prov = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/user/exists?userName=' + name + '&provider=' + prov);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.exists).toBe(true);
    }));
    test('Usuario no existente', () => __awaiter(void 0, void 0, void 0, function* () {
        let name = "notExampleName";
        let prov = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/user/exists?userName=' + name + '&provider=' + prov);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.exists).toBe(false);
    }));
});
describe('Añadir solicitud al sistema', () => {
    test('Solicitud añadida', () => __awaiter(void 0, void 0, void 0, function* () {
        let senderName = "exampleName";
        let senderProvider = "inrupt";
        let receiverName = "exampleName";
        let receiverProvider = "inrupt";
        const response = yield (0, supertest_1.default)(app).post('/solicitude/add').send({ senderName: senderName, senderProvider: senderProvider, receiverName: receiverName, receiverProvider: receiverProvider });
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.added).toBe(true);
    }));
});
describe('Comprobar existencia de solicitud en el sistema', () => {
    test('Solicitud existente', () => __awaiter(void 0, void 0, void 0, function* () {
        let senderName = "exampleName";
        let senderProvider = "inrupt";
        let receiverName = "exampleName";
        let receiverProvider = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/solicitude/exists?senderName=' + senderName + '&senderProvider=' + senderProvider + '&receiverName=' + receiverName + '&receiverProvider=' + receiverProvider);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.exists).toBe(true);
    }));
    test('Solicitud no existente', () => __awaiter(void 0, void 0, void 0, function* () {
        let senderName = "notExampleName";
        let senderProvider = "inrupt";
        let receiverName = "exampleName";
        let receiverProvider = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/solicitude/exists?senderName=' + senderName + '&senderProvider=' + senderProvider + '&receiverName=' + receiverName + '&receiverProvider=' + receiverProvider);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.exists).toBe(false);
    }));
});
describe('Obtener las solicitudes de un usuario del sistema', () => {
    test('Solicitudes hacia un usuario', () => __awaiter(void 0, void 0, void 0, function* () {
        let receiverName = "exampleName";
        let receiverProvider = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/solicitude/getAll?userName=' + receiverName + '&provider=' + receiverProvider);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.solicitudes).toHaveLength(1);
    }));
});
describe('Eliminar solicitud del sistema', () => {
    test('Solicitud eliminada', () => __awaiter(void 0, void 0, void 0, function* () {
        let senderName = "exampleName";
        let senderProvider = "inrupt";
        let receiverName = "exampleName";
        let receiverProvider = "inrupt";
        const response = yield (0, supertest_1.default)(app).post('/solicitude/delete').send({ senderName: senderName, senderProvider: senderProvider, receiverName: receiverName, receiverProvider: receiverProvider });
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.deleted).toBe(true);
    }));
});
describe('Eliminar usuario del sistema', () => {
    test('Usuario eliminado', () => __awaiter(void 0, void 0, void 0, function* () {
        let webId = "https://exampleName.inrupt.net";
        const response = yield (0, supertest_1.default)(app).post('/user/delete').send({ userWebId: webId });
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.deleted).toBe(true);
    }));
});
describe('LANZAMIENTO DE EXCEPCIONES POR ERRORES', () => {
    test('Usuario registrado / no registrado', () => __awaiter(void 0, void 0, void 0, function* () {
        mongoose_1.default.disconnect();
        let name = "exampleName";
        let webId = "https://exampleName.inrupt.net";
        let prov = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/user/isRegistered?userName=' + name + '&userWebId=' + webId + '&provider=' + prov);
        expect(response.status).toBe(500);
        let res = JSON.parse(response.text);
        expect(res.error).toBe('Error al buscar usuario');
    }));
    test('Usuario existente / no existente', () => __awaiter(void 0, void 0, void 0, function* () {
        let name = "exampleName";
        let prov = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/user/exists?userName=' + name + '&provider=' + prov);
        expect(response.status).toBe(500);
        let res = JSON.parse(response.text);
        expect(res.error).toBe('Error al buscar usuario');
    }));
    test('Solicitud existente / no existente', () => __awaiter(void 0, void 0, void 0, function* () {
        let senderName = "exampleName";
        let senderProvider = "inrupt";
        let receiverName = "exampleName";
        let receiverProvider = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/solicitude/exists?senderName=' + senderName + '&senderProvider=' + senderProvider + '&receiverName=' + receiverName + '&receiverProvider=' + receiverProvider);
        expect(response.status).toBe(500);
        let res = JSON.parse(response.text);
        expect(res.error).toBe('Error al buscar solicitud');
    }));
    test('Solicitudes hacia un usuario', () => __awaiter(void 0, void 0, void 0, function* () {
        let receiverName = "exampleName";
        let receiverProvider = "inrupt";
        const response = yield (0, supertest_1.default)(app).get('/solicitude/getAll?userName=' + receiverName + '&provider=' + receiverProvider);
        expect(response.status).toBe(500);
        let res = JSON.parse(response.text);
        expect(res.error).toBe('Error al buscar solicitud');
    }));
});
