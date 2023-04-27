import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../api';
import mongoose from "mongoose";

const uri = "mongodb+srv://dbManager:1234@lomap-es3c-db.gfgwc7j.mongodb.net/?retryWrites=true&w=majority";

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    app.use(cors(options));
    app.use(bp.json());
    app.use("/api", api)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });

    mongoose.connect(uri)
    .then(() => {
            console.log('Conexion correcta a la BD')
    }).catch((err:any) => {
        console.log(err)
    })
});

afterAll(async () => {
    server.close() //close the server
    mongoose.connection.close();
})

describe('user ', () => {
    /**
     * Test that we add a user.
     */
    it('can be added',async () => {
        let name:string = "exampleName";
        let webId:string = "https://exampleName.inrupt.net";
        let prov:string = "inrupt";
        const response:Response = await request(app).post('/api/user/add').send({userName: name,userWebId: webId, provider: prov}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    /**
     * Test that we can delete a user.
     */
    it('can be deleted',async () => {
        let webId:string = "https://exampleName.inrupt.net";
        const response:Response = await request(app).post('/api/user/delete').send({userWebId: webId}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});