import request, { Response } from 'supertest';
import express, { Application, RequestHandler } from 'express';
import { Server } from "http";
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';
import path, { normalize } from 'path';
import promBundle from "express-prom-bundle";
import apiUser from "../api";
import mongoose from 'mongoose';

const app: Application = express();
var server: Server;

beforeAll(async () => {
    require("../src/db")
    const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
    app.use(metricsMiddleware);

    app.use(bp.json());
    app.use(bp.urlencoded({ extended: false }));
    app.use(apiUser);

    server = app.listen(5000);
});

afterAll(async () => {
    server.close();
    await mongoose.connection.close(); // cierra la conexión al final de las pruebas
});

describe('Prueba', () => {
    test('Prueba', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
    });
});

describe('Añadir usuario al sistema', () => {
    test('Usuario añadido', async () => {
        let name: string = "exampleName";
        let webId: string = "https://exampleName.inrupt.net";
        let prov: string = "inrupt";
        const response = await request(app).post('/user/add').send({ userName: name, userWebId: webId, provider: prov });
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.added).toBe(true);
    });
});

describe('Comprobar registro de usuario en el sistema', () => {
    test('Usuario registrado', async () => {
        let name: string = "exampleName";
        let webId: string = "https://exampleName.inrupt.net";
        let prov: string = "inrupt";
        const response = await request(app).get('/user/isRegistered?userName=' + name + '&userWebId=' + webId + '&provider=' + prov);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.isRegistered).toBe(true);
    });
    test('Usuario no registrado', async () => {
        let name: string = "notExampleName";
        let webId: string = "https://notExampleName.inrupt.net";
        let prov: string = "inrupt";
        const response = await request(app).get('/user/isRegistered?userName=' + name + '&userWebId=' + webId + '&provider=' + prov);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.isRegistered).toBe(false);
    });
});

describe('Comprobar existencia de usuario en el sistema', () => {
    test('Usuario existente', async () => {
        let name: string = "exampleName";
        let prov: string = "inrupt";
        const response = await request(app).get('/user/exists?userName=' + name + '&provider=' + prov);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.exists).toBe(true);
    });
    test('Usuario no existente', async () => {
        let name: string = "notExampleName";
        let prov: string = "inrupt";
        const response = await request(app).get('/user/exists?userName=' + name + '&provider=' + prov);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.exists).toBe(false);
    });
});

describe('Añadir solicitud al sistema', () => {
    test('Solicitud añadida', async () => {
        let senderName: string = "exampleName";
        let senderProvider: string = "inrupt";
        let receiverName: string = "exampleName";
        let receiverProvider: string = "inrupt";
        const response = await request(app).post('/solicitude/add').send({senderName : senderName, senderProvider : senderProvider, receiverName : receiverName, receiverProvider: receiverProvider});
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.added).toBe(true);
    });
});

describe('Comprobar existencia de solicitud en el sistema', () => {
    test('Solicitud existente', async () => {
        let senderName: string = "exampleName";
        let senderProvider: string = "inrupt";
        let receiverName: string = "exampleName";
        let receiverProvider: string = "inrupt";
        const response = await request(app).get('/solicitude/exists?senderName=' + senderName + '&senderProvider=' + senderProvider + '&receiverName=' + receiverName + '&receiverProvider=' + receiverProvider);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.exists).toBe(true);
    });
    test('Solicitud no existente', async () => {
        let senderName: string = "notExampleName";
        let senderProvider: string = "inrupt";
        let receiverName: string = "exampleName";
        let receiverProvider: string = "inrupt";
        const response = await request(app).get('/solicitude/exists?senderName=' + senderName + '&senderProvider=' + senderProvider + '&receiverName=' + receiverName + '&receiverProvider=' + receiverProvider);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.exists).toBe(false);
    });
});

describe('Obtener las solicitudes de un usuario del sistema', () => {
    test('Solicitudes hacia un usuario', async () => {
        let receiverName: string = "exampleName";
        let receiverProvider: string = "inrupt";
        const response = await request(app).get('/solicitude/getAll?userName=' + receiverName + '&provider=' + receiverProvider);
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.solicitudes).toHaveLength(1);
    });
});

describe('Eliminar solicitud del sistema', () => {
    test('Solicitud eliminada', async () => {
        let senderName: string = "exampleName";
        let senderProvider: string = "inrupt";
        let receiverName: string = "exampleName";
        let receiverProvider: string = "inrupt";
        const response = await request(app).post('/solicitude/delete').send({senderName : senderName, senderProvider : senderProvider, receiverName : receiverName, receiverProvider: receiverProvider});
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.deleted).toBe(true);
    });
});

describe('Eliminar usuario del sistema', () => {
    test('Usuario eliminado', async () => {
        let webId: string = "https://exampleName.inrupt.net";
        const response = await request(app).post('/user/delete').send({ userWebId: webId });
        expect(response.status).toBe(200);
        let res = JSON.parse(response.text);
        expect(res.deleted).toBe(true);
    });
});

describe('LANZAMIENTO DE EXCEPCIONES POR ERRORES', () => {
    test('Usuario registrado / no registrado', async () => {
        mongoose.disconnect();
        let name: string = "exampleName";
        let webId: string = "https://exampleName.inrupt.net";
        let prov: string = "inrupt";
        const response = await request(app).get('/user/isRegistered?userName=' + name + '&userWebId=' + webId + '&provider=' + prov);
        expect(response.status).toBe(500);
        let res = JSON.parse(response.text);
        expect(res.error).toBe('Error al buscar usuario');
    });
    test('Usuario existente / no existente', async () => {
        let name: string = "exampleName";
        let prov: string = "inrupt";
        const response = await request(app).get('/user/exists?userName=' + name + '&provider=' + prov);
        expect(response.status).toBe(500);
        let res = JSON.parse(response.text);
        expect(res.error).toBe('Error al buscar usuario');
    });
    test('Solicitud existente / no existente', async () => {
        let senderName: string = "exampleName";
        let senderProvider: string = "inrupt";
        let receiverName: string = "exampleName";
        let receiverProvider: string = "inrupt";
        const response = await request(app).get('/solicitude/exists?senderName=' + senderName + '&senderProvider=' + senderProvider + '&receiverName=' + receiverName + '&receiverProvider=' + receiverProvider);
        expect(response.status).toBe(500);
        let res = JSON.parse(response.text);
        expect(res.error).toBe('Error al buscar solicitud');
    });
    test('Solicitudes hacia un usuario', async () => {
        let receiverName: string = "exampleName";
        let receiverProvider: string = "inrupt";
        const response = await request(app).get('/solicitude/getAll?userName=' + receiverName + '&provider=' + receiverProvider);
        expect(response.status).toBe(500);
        let res = JSON.parse(response.text);
        expect(res.error).toBe('Error al buscar solicitud');
    });
});