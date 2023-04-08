import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
//import Prueba from './src/pruebaSchema';
import User from './src/userSchema';
import Solicitude from './src/solicitudeSchema';
import UserFind from './src/userFindSchema';

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
    // Hacer la llamada
    let data = req.body.data;
    const pruebaData = new Prueba({data : data});
    pruebaData.save();
    // Manejar el retorno
    return res.status(200).send({back: "Prueba Hecha"});
  }
)
*/

// IMPLEMENTAR RESTO DE MÉTODOS

api.get(
  "/user/isRegistered",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const userName = req.query.userName;
      const userWebId = req.query.userWebId;
      const provider = req.query.provider;

      const user = await User.findOne({ userName, userWebId, provider });

      if (user) {
        return res.status(200).send({ isRegistered: true });
      } else {
        return res.status(200).send({ isRegistered: false });
      }
    } catch (error) {
      return res.status(500).send({ error: 'Error al buscar usuario' });
    }
  }
);

api.post(
  "/user/add",
  async (req: Request, res: Response): Promise<Response> => {
    // Hacer la llamada
    let userName = req.body.userName;
    let userWebId = req.body.userWebId;
    let provider = req.body.provider;
    const userData = new User({userName : userName, userWebId : userWebId, provider : provider});
    userData.save();
    // Manejar el retorno
    return res.status(200);
  }
)

api.get(
  "/user/exists",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const userName = req.query.userName;
      const provider = req.query.provider;

      const user = await User.findOne({ userName: userName, provider: provider });

      if (user) {
        return res.status(200).send({ exists: true });
      } else {
        return res.status(200).send({ exists: false });
      }
    } catch (error) {
      return res.status(500).send({ error: 'Error al buscar usuario' });
    }
  }
);

api.get(
  "/solicitude/exists",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const receiverName = req.query.receiverName;
      const receiverProvider = req.query.receiverProvider;
      const senderName = req.query.senderName;
      const senderProvider = req.query.senderProvider;

      const solicitude = await Solicitude.findOne({ senderName, senderProvider, receiverName, receiverProvider});

      if (solicitude) {
        return res.status(200).send({ exists: true });
      } else {
        return res.status(200).send({ exists: false });
      }
    } catch (error) {
      return res.status(500).send({ error: 'Error al buscar solicitud' });
    }
  }
);

api.post(
  "/solicitude/add",
  async (req: Request, res: Response): Promise<Response> => {
    // Hacer la llamada
    let senderName = req.body.senderName;
    let senderProvider = req.body.senderProvider;
    let receiverName = req.body.receiverName;
    let receiverProvider = req.body.receiverProvider;
    const solicitudeData = new Solicitude({senderName : senderName, senderProvider : senderProvider, receiverName : receiverName, receiverProvider: receiverProvider});
    solicitudeData.save();
    // Manejar el retorno
    return res.status(200);
  }
)

export default api;