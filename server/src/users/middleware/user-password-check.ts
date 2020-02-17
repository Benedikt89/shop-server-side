import {usersRepository} from "../dal/users-repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

const checkAuthUser = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        let userFound = await usersRepository.getUser(user.phone);
        if (userFound.length < 1)
            return res.status(401).json({
                message: 'phone or password not correct'
            });
        const compared = await bcrypt.compare(user.password, userFound[0].password);
        if (!compared) {
            return res.status(401).json({
                message: 'phone or password not correct'
            });
        }
        if (compared) {
            // @ts-ignore
            req.session.user_id = userFound[0].id;

            const token = jwt.sign({
                    phone: userFound[0].phone,
                    userId: userFound[0].id
                },
                // @ts-ignore
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                },
            );
            res.cookie("x-access-token" , token, {maxAge: 9999999, sameSite: 'None'});
            res.locals.userFound = userFound[0];
        }
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Incorrect Token'
        })
    }
};
export default checkAuthUser;