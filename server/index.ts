import express, { Request, Response } from "express";
import { createConnection } from "typeorm";

import { AppRoutes } from "./routes";


createConnection().then(async connection => {
	const app = express();
	
	// cors setting
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Refresh-Token, Access-Token");
		next();
	});

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, async(request: Request, response: Response, next: Function) => {
			route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

	app.listen(Number(process.env.SERVER_PORT));
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
}).catch(error => console.log("TypeORM connection error: ", error));
