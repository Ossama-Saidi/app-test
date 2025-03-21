import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
// import * as fastifyCors from '@fastify/cors';

//import { join } from 'path';
//import * as express from 'express';
//import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Enregistre le plugin multipart
  //app.register(fastifyMultipart);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
 // Serve static files from the "uploads" directory with a prefix
 // Serve static files
  /*app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/',
  });
*/
  await app.listen(process.env.PORT ?? 3001);
  const server = app.getHttpAdapter();
  Logger.log(`Routes: ${JSON.stringify(server.getInstance().route)}`);
  console.log('Authentication microservice running on http://localhost:3001');
}
bootstrap();