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

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.disable("x-powered-by");

app.use(cors());
app.use(bp.json());

app.use("/api", api)

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    if (typeof req.query.url === "string" && req.query.url.startsWith("https://98.71.248.38")) {
      res.redirect(`https://${req.headers.host}${req.url}`);
  }
  }
});

https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Restapi server started on port ${httpsPort}`);
}).on("error", (error: Error) => {
  console.error("Error occured: " + error.message);
});

app.listen(port, (): void => {
  console.log('Restapi listening on ' + port);
}).on("error", (error: Error) => {
  console.error('Error occured: ' + error.message);
});

