import {FastifyInstance} from "fastify";
import {printSchema} from 'graphql';

export default function (fastify: FastifyInstance) {
  fastify.post('/schema.graphql', async () => {
    return printSchema(fastify.graphql.schema);
  });
}
