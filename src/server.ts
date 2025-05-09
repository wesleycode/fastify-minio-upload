import fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import 'dotenv/config';
import { PublicRouter } from './infrastructure/route-managers/public-router';
import { NotFoundRouter } from './infrastructure/route-managers/not-found-router';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider, } from 'fastify-type-provider-zod';
import fastifyCors from '@fastify/cors';

const server = fastify({
    logger: true,
});

server.register(fastifyCors);

// Registra o plugin de multipart para lidar com uploads de arquivos
server.register(fastifyMultipart, {
    limits: {
        fileSize: 100 * 1024 * 1024 // Limite de 100MB
    }
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifySwagger, {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'API Teste MinIO',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        }
    },
    transform: jsonSchemaTransform
});

server.register(fastifySwaggerUi, {
    routePrefix: '/documentation'
});

server.register(PublicRouter, { prefix: '/api/public' });
// server.register(NotFoundRouter);

// Inicia o servidor
const start = async () => {
    try {
        await server.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Servidor rodando em http://localhost:3000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();