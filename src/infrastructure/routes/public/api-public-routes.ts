import { FastifyReply, FastifyRequest } from "fastify";

export async function getApiHealth(request: FastifyRequest, reply: FastifyReply) {

    const { text } = request.params as any;

    return reply.status(200).send({
        message: 'OK',
        data: text
    });
}