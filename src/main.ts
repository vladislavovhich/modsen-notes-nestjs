import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('Notes API')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  
  SwaggerModule.setup('api-docs', app, document);
  
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({transform: true}))

  await app.listen(3000);
}
bootstrap();
