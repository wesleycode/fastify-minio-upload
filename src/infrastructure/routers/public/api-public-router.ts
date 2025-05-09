import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getApiHealth } from "../../routes/public/api-public-routes";

export function ApiPublicRouter(app: FastifyInstance, opts: FastifyPluginOptions, done: any) {

    app.withTypeProvider<ZodTypeProvider>().get('/:text', {
        schema: {
            response: {
                200: z.object({
                    message: z.string(),
                    data: z.string(),
                }),
            },
            params: z.object({
                text: z.string({ message: 'Este campo é obrigatório!' })
            }),
        }
    }, getApiHealth);

    done();

}