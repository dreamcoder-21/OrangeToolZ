"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const routes_1 = require("./routes");
typeorm_1.createConnection().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    // cors setting
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Refresh-Token, Access-Token");
        next();
    });
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // register all application routes
    routes_1.AppRoutes.forEach(route => {
        app[route.method](route.path, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        }));
    });
    app.listen(Number(process.env.SERVER_PORT));
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
})).catch(error => console.log("TypeORM connection error: ", error));
//# sourceMappingURL=index.js.map