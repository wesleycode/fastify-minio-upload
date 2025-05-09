import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { postUploadFile } from "../../routes/public/file-public-routes";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export function FilesPublicRouter(app: FastifyInstance, opts: FastifyPluginOptions, done: any) {

    app.withTypeProvider<ZodTypeProvider>().post('/upload', {
        schema: {
            response: {
                200: z.object({
                    message: z.string(),
                    filename: z.string(),
                    bucket: z.string(),
                }),
            }
        }
    }, postUploadFile);

    done();

}