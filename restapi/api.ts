import express, { Request, Response, Router } from 'express';
import User from './src/userSchema';
import Solicitude from './src/solicitudeSchema';

const mongoose = require('mongoose');

const api:Router = express.Router()


// BBDD Conf 5/6 - Método que implementa el GET/POST

// IMPLEMENTAR MÉTODOS

api.get(
  "/test",
  (req: Request, res: Response): void => {
    res.status(200).json();
  }
);

api.get(
  "/user/isRegistered",
  (req: Request, res: Response): void => {
    try {
      const userName = req.query.userName;
      const userWebId = req.query.userWebId;
      const provider = req.query.provider;

      User.findOne({ userName: userName?.toString(), userWebId: userWebId?.toString(), provider: provider?.toString() })
        .then((user) => {
          if (user) {
            res.status(200).send({ isRegistered: true });
          } else {
            res.status(200).send({ isRegistered: false });
          }
        })
    } catch (error) {
      res.status(500).send({ error: 'Error al buscar usuario' });
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
    // Insertar el usuario en la base de datos
    await userData.save();
    // Manejar el retorno
    return res.status(200).send({ added : true });
  }
)

api.get(
  "/user/exists",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const userName = req.query.userName;
      const provider = req.query.provider;

      const user = await User.findOne({ userName: userName?.toString(), provider: provider?.toString() });

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
  (req: Request, res: Response): void => {
    try {
      const receiverName = req.query.receiverName;
      const receiverProvider = req.query.receiverProvider;
      const senderName = req.query.senderName;
      const senderProvider = req.query.senderProvider;

      Solicitude.findOne({ senderName: senderName?.toString(), senderProvider: senderProvider?.toString(), receiverName: receiverName?.toString(), receiverProvider: receiverProvider?.toString() })
        .then((solicitude) => {
          if (solicitude) {
            res.status(200).send({ exists: true });
          } else {
            res.status(200).send({ exists: false });
          }
        })
    } catch (error) {
      res.status(500).send({ error: 'Error al buscar solicitud' });
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
    // Insertar la solicitud en la base de datos
    await solicitudeData.save();
    // Manejar el retorno
    return res.status(200).send({ added: true });
  }
)

api.get(
  "/solicitude/getAll",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const receiverName = req.query.userName;
      const receiverProvider = req.query.provider;

      const solicitudes = await Solicitude.find({ receiverName: receiverName?.toString(), receiverProvider: receiverProvider?.toString() });

      return res.status(200).send({ solicitudes: solicitudes });
    } catch (error) {
      return res.status(500).send({ error: 'Error al buscar solicitud' });
    }
  }
);

api.post(
  "/solicitude/delete",
  async (req: Request, res: Response): Promise<Response> => {
    // Hacer la llamada
    let senderName = req.body.senderName;
    let senderProvider = req.body.senderProvider;
    let receiverName = req.body.receiverName;
    let receiverProvider = req.body.receiverProvider;
    await Solicitude.deleteOne({senderName: senderName.toString(), senderProvider: senderProvider.toString(), receiverName: receiverName.toString(), receiverProvider: receiverProvider.toString()});
    // Manejar el retorno
    return res.status(200).send({ deleted: true });
  }
)

api.post(
  "/user/delete",
  async (req: Request, res: Response): Promise<Response> => {
    // Hacer la llamada
    let userWebId = req.body.userWebId;
    await User.deleteOne({userWebId : userWebId.toString()});
    // Manejar el retorno
    return res.status(200).send({ deleted: true });
  }
)

export default api;