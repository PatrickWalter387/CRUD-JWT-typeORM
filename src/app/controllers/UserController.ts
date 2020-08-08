import {Request, Response} from "express";
import User from "../models/User";
import { getRepository } from "typeorm";

class UserController{
    async index(req: Request, res: Response) {
        return res.send({id: req.userId});
    }

    async store(req: Request, res: Response){
        const {email, password} = req.body;

        const exists = await getRepository(User).findOne({ email });
        //const exists = await getRepository(User).findOne({ where: { email } }); Serve tbm

        if(exists){
            return res.status(409).json({ message: "Email já em uso" });
            //return res.sendStatus(409); - Ja montra sozinho uma mensagem de conflito conforme erro 409
        }

        const user = getRepository(User).create({email, password});
        const result = await getRepository(User).save(user);

        return res.json(result);
    }
}

export default new UserController(); //Garante q so vai existir uma unica instancia dessa classe por vez