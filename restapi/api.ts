import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import Prueba from './src/pruebaSchema';

const mongoose = require('mongoose');

const api:Router = express.Router()

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

// BBDD Conf 5/6 - Método que implementa el GET/POST
/*
api.post(
  "/prueba/bbdd",
  async (req: Request, res: Response): Promise<Response> => {
    let data = req.body.data;
    const pruebaData = new Prueba({data : data});
    pruebaData.save();
    return res.status(200).send({back: "Prueba Hecha"});
  }
)
*/

export default api;