import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";

const checkAuthToken = (req:Request, res: Response, next: NextFunction) => {
    try {
        // Express headers are auto converted to lowercase
        let token = req.cookies['x-access-token'] || req.headers['authorization'];
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        //adding key
        let KEY = process.env.JWT_KEY ? process.env.JWT_KEY : "watsuuuup";
            req.signedCookies = jwt.verify(token, KEY);
    } catch (err) {
        return res.status(401).json({
            message: 'Incorrect Token'
        })
    }
    next();
};
export default checkAuthToken;
