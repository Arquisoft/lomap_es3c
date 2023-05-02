import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 

const app: Application = express();
const port: number = 5000;
const https = require('https');
const fs = require('fs');
// BBDD Conf 2/6 - Require (Importar)
const db = require("./src/db");

const httpsPort = 5001;

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors());
app.use(bp.json());

app.use("/api", api)

const options = {
    key: fs.readFileSync(process.env.SSL_PRIVKEY),
    cert: fs.readFileSync(process.env.SSL_CERT)
  };

https.createServer(options, app).listen(httpsPort, () => {
    console.log(`Restapi server started on port ${httpsPort}`);
  }).on("error", (error: Error) => {
      console.error("Error occured: " + error.message);
});

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

