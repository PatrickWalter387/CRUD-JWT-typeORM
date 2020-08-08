import {Request, Response} from "express";
import User from "../models/User";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController{
    async store(req: Request, res: Response){
        const {email, password} = req.body;
        const user = await getRepository(User).findOne({ email });
        //const exists = await getRepository(User).findOne({ where: { email } }); Serve tbm

        if(!user){
            return res.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.sendStatus(401);
        }

        const token = jwt.sign({ id: user.id }, "secret", {expiresIn: "1d"});

        delete user.password;

        return res.json({
            user,
            token
        });

    }
}

export default new AuthController(); //Garante q so vai existir uma unica instancia dessa classe por vez