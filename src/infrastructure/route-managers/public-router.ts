import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { FilesPublicRouter } from "../routers/public/files-public-router";
import { ApiPublicRouter } from "../routers/public/api-public-router";

export function PublicRouter(app: FastifyInstance, opts: FastifyPluginOptions, next: () => void) {

    app.register(ApiPublicRouter, { prefix: '/' });
    app.register(FilesPublicRouter, { prefix: '/files' });

    next();

}