import { Express, RequestHandler, Router, NextFunction } from 'express';
import * as express from 'express';

export enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete"
}

export class BaseController {
    server: Express;
    router: Router;
    constructor(prefix: string) {
        this.server = express();
        this.router = Router();
        this.server.use(prefix, this.router);
    }
    createMethod(method: HttpMethod, route: string, handler: RequestHandler) {
        this.router[method](route, handler);
    }
}