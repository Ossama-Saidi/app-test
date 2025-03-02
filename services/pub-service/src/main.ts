import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
);

// Activer CORS
app.enableCors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de l'application Next.js
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

  await app.listen(process.env.PORT ?? 3001);

  const server = app.getHttpAdapter();
  Logger.log(`Routes: ${JSON.stringify(server.getInstance().route)}`);
  console.log('Authentication microservice running on http://localhost:3001');
}
bootstrap();