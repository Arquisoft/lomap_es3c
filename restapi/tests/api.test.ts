import request, { Response } from 'supertest';
import express, { Application, RequestHandler } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';
import path, { normalize } from 'path';



let app: Application;
let server: http.Server;

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://dbManager:1234@lomap-es3c-db.gfgwc7j.mongodb.net/?retryWrites=true&w=majority';
let connection: { close: () => any; };

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    server = app.listen(port, (): void => {
        console.log('Restapi server for testing listening on ' + port);
    }).on("error", (error: Error) => {
        console.error('Error occured: ' + error.message);
    });

    connection = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    server.close();
    await connection.close(); // cierra la conexión al final de las pruebas
});

describe('users ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be added', async () => {
        let name: string = "exampleName";
        let webId: string = "https://exampleName.inrupt.net";
        let prov: string = "inrupt";
        const response: Response = await request(app).post('/api/user/add').send({ userName: name, userWebId: webId, provider: prov }).set('Accept', 'application/json');
        console.log("Recibe respuesta");
        console.log("response");
        expect(response.statusCode).toBe(200);
    });
});