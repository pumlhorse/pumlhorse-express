import { SessionOutput } from './SessionOutput';
import * as path from 'path';
import * as express from 'express';
import * as _ from 'underscore';
import { App, IProfile } from 'pumlhorse';
import { serverError } from './serverError';

const _app = new App();

interface ISiteDefinition {
    routes: RoutesList;
}

type RoutesList = { [route: string]: MethodsList }
type MethodsList = { [method: string]: Route }
type Route = string | IRoute;
interface IRoute {
    file: string
}

export class Router {
    expressRouter;

    constructor(private site: ISiteDefinition) {

        if (this.site.routes == null) {
            throw new Error(`Site definition must contain "routes" dictionary`);
        }

        this.expressRouter = express.Router();

        for (let routePath in this.site.routes) {
            const methods = this.site.routes[routePath];
            for (let m in methods) {
                const methodName = m.toLowerCase();
                const route = methods[methodName];
                const handler = new Handler(_.isString(route) ? { file: <string>route } : <IRoute>route);
                this.expressRouter[methodName](routePath, (request, response) => handler.handleRequest(request, response));
            }
        }
    }

    static create(site: ISiteDefinition) {
        let router = new Router(site);
        return router.expressRouter;
    }
}

function Context(request, response) {
  this.path = request.params;
  this.query = request.query;
  this.headers = request.headers;
  this.__webserverResponse = response;
  this.body = request.body;
}

class Handler {
    file: string;
    private static webserverModule = {
        name: 'pumlhorse-webserver',
        path: path.join(__dirname, 'pumlhorse-webserver')
    }

    constructor(private settings: IRoute) {
    }

    handleRequest(request, response) {
        const context = new Context(request, response);
        const profile: IProfile = {
            include: [this.settings.file],
            modules: [Handler.webserverModule],
            contexts: [context]
        };
        const output = new SessionOutput(request, response);

        _app.runProfile(profile, output).catch(err => serverError(response, err));
    }
}