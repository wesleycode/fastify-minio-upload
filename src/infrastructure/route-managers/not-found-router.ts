import { FastifyInstance, FastifyPluginOptions } from "fastify";

export function NotFoundRouter(app: FastifyInstance, opts: FastifyPluginOptions, done: any) {
    return app.setNotFoundHandler((request, reply) => {
        return reply.redirect('https://abdconst.com.br');
    });
}