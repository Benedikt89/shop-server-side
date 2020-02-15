import {NextFunction, Request, Response} from "express";

module.exports = (req:Request, res:Response, next:NextFunction) => {
    let sess;

    if (!req.session) {

    }
    sess = req.session;
    if (sess) {
        sess.phone = req.body.phone;
    }
    next();
};