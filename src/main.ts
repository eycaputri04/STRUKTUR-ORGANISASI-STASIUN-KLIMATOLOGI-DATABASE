import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting body parser limit supaya bisa handle payload besar
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // Enable CORS
  app.enableCors({
    origin: true,  // Kalau mau lebih strict bisa ganti dengan array domain seperti ['http://localhost:3000', 'https://myfrontend.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API Dokumentasi')
    .setDescription('Dokumentasi endpoint API untuk aplikasi kamu')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URL Swagger docs: /api

  await app.listen(3000);
}
bootstrap();
