import {usersRepository} from "./dal/users-repository";
import express, {NextFunction, Request, Response} from "express";
import checkAuthUser from "./middleware/user-password-check";
import checkAuthToken from "./middleware/check-auth-token";
const router = express.Router();
import {upload} from "./dal/ImageHolder";
import * as fs from "fs";
import {rootPath} from "../config";


router.get('/auth-me', checkAuthUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json({
            message: 'Auth Successful',
            userInfo: {
                userName: res.locals.userFound.email,
                id: res.locals.userFound.id
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});
router.post('/login', checkAuthUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
            return res.status(200).json({
                message: 'Auth Successful',
                userInfo: {...res.locals.userFound.getFullDataToSend(), rememberMe: null, tokenDeathTime: null}
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.delete('/logout', (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("x-access-token");
    res.clearCookie("_csrf");
    res.clearCookie("BENS_TOKEN");
    res.send("success");
});

router.post(`/register`, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        let userFind = await usersRepository.getUser(user.email);
        // @ts-ignore
        if (!userFind.length >= 1) {
            const newUser = await usersRepository.addUser(user);
            console.log(newUser);
            return res.json({
                message: 'Auth Successful',
                userInfo: newUser
            })
                .status(201)
        } else {
            return res.status(409).json({message: "This Email Already Used"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.put('/', checkAuthToken,
    async (req: Request, res: Response) => {
        try {
            let newUserInfo = req.body;
            newUserInfo.photo = newUserInfo.photo.slice(22, newUserInfo.photo.length);
            let updated = await usersRepository.updateUser(newUserInfo);
            res.status(200).send(updated)
        } catch (err) {
            res.status(402).send(err)
        }
    });

router.delete('/:email', checkAuthToken,
    async (req: Request, res: Response) => {
        try {
            const userEmail = req.params.email;
            let founded = await usersRepository.getUserInfo(userEmail);

            if (founded.photo !== 'no Photo') {
                fs.unlink(rootPath + `${founded.photo}`, (err) => {
                    if (err)
                        throw err;
                    console.log(`${founded.photo} was deleted`);
                });
            }
            usersRepository.deleteUser(userEmail);

            return res.status(204).send(founded)
        } catch (err) {
            return res.status(400).send(err);
        }
    });

router.put('/edit', checkAuthToken, upload.single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //checking file
            const file = req.file;
            if (!file) {
                const error: any = new Error('Please upload a file');
                error.status = 400;
                return next(error)
            }

            let newUserData = {...req.body, photo: file.path.replace(/\\+/g, "/")};
            let result = await usersRepository.addUser(newUserData);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    });

export default router;