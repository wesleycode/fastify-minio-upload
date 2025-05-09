import { FastifyReply, FastifyRequest } from "fastify";
import { Client } from "minio";

export async function postUploadFile(request: FastifyRequest, reply: FastifyReply) {
    try {

        const ENDPOINT = process.env.MINIO_ENDPOINT;
        const ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
        const SECRET_KEY = process.env.MINIO_SECRET_KEY;
        const MINIO_BUCKET = process.env.MINIO_BUCKET;

        if (!ENDPOINT || !ACCESS_KEY || !SECRET_KEY || !MINIO_BUCKET) {
            throw new Error('SEM DADOS DO MINIO NO ENV!');
        }

        // Configurações do MinIO - substitua com suas credenciais
        const minioClient = new Client({
            endPoint: ENDPOINT, // Subdomínio dedicado à API
            useSSL: true,
            accessKey: ACCESS_KEY,
            secretKey: SECRET_KEY
        });

        const data = await request.file();

        if (!data) {
            return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
        }

        const { file, filename, mimetype } = data;

        // Nome único para o arquivo no bucket
        const objectName = `${Date.now()}-${filename}`;

        await minioClient.putObject(MINIO_BUCKET, objectName, file, undefined, {
            'Content-Type': mimetype
        });

        return reply.status(200).send({
            message: 'Arquivo enviado com sucesso',
            filename: objectName,
            bucket: MINIO_BUCKET
        });
        
    } catch (error) {
        console.error('Erro no upload:', error);
        return reply.status(500).send({ error: 'Falha ao processar o arquivo' });
    }
}