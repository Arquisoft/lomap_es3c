import express, { Request, Response, Router } from 'express';
import User from './src/userSchema';
import Solicitude from './src/solicitudeSchema';

const mongoose = require('mongoose');

const api:Router = express.Router()


// BBDD Conf 5/6 - Método que implementa el GET/POST

// IMPLEMENTAR MÉTODOS

api.get(
  "/test",
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json();
  }
);

api.get(
  "/user/isRegistered",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await User.findOne({ userName: req.query.userName, userWebId: req.query.userWebId, provider: req.query.provider }).lean();
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

      const solicitudes = await Solicitude.find({ receiverName: receiverName, receiverProvider: receiverProvider });

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
    await Solicitude.deleteOne({senderName, senderProvider, receiverName, receiverProvider});
    // Manejar el retorno
    return res.status(200).send({ deleted: true });
  }
)

api.post(
  "/user/delete",
  async (req: Request, res: Response): Promise<Response> => {
    // Hacer la llamada
    let userWebId = req.body.userWebId;
    await User.deleteOne({userWebId : userWebId});
    // Manejar el retorno
    return res.status(200).send({ deleted: true });
  }
)

export default api;