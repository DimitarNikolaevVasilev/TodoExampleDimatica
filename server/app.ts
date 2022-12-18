import fastify, {FastifyInstance} from 'fastify';
import mercurius from "mercurius";
import {makeExecutableSchema} from "@graphql-tools/schema";
import allGraphqlSchemes from "./helpers/allGraphqlSchemes";
import allResolvers from "./helpers/allResolvers";

import addFastifyDocs from "./helpers/fastifyGrapqlSchemaDocs";

import fastifyCors from "@fastify/cors";

class Server {
  public instance: FastifyInstance;


  public config() {
    this.instance.register(mercurius, {
			schema: makeExecutableSchema({
        typeDefs: allGraphqlSchemes,
        resolvers: allResolvers
      })
		});

    this.instance.register(fastifyCors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    });

    addFastifyDocs(this.instance)
	}

  constructor(opts = {}) {
    this.instance = fastify(opts);
  }

  public async start(port: number | string, ...props: any): Promise<void> {
    this.config();
    await this.instance.listen({
      port,
      host: '0.0.0.0',
      ...props}, );
  }
}

export default Server;