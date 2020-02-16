import express, {NextFunction, Request, Response} from "express";
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from "cors";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import morgan from 'morgan';
import path from 'path';

// setup routers
import {imagesPath, staticPath} from "./config";
import users from "./users/users-router";
import orders from "./contacts/orders-router";

//Database connections
mongoose.connect('mongodb://localhost/productShop', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
});

const corsOptions = {
    origin: true,
    credentials: true,
};

//Initiate app
const app: express.Application = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//adding session cookies
app.use(session({
    secret: 'ssshhhhh',
    name: 'SESSION_TOKEN',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false
    }
}));
//Configure
app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', users);
app.use('/api/orders', orders);

//local Static Files
app.use('/public', express.static(staticPath));
app.use('/static/images/', express.static(imagesPath));


//sendStatic
app.get('/', (req: Request, res: Response) => {
    res.sendFile(staticPath + '/index.html');
});


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    let err = new Error('Not Found');
    // @ts-ignore
    err["status"] = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(8000, () => {
    console.log('App listening port 8000')
});