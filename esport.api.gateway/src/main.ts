import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'
import { ConfigService } from '@nestjs/config';

dotenv.config()

async function bootstrap() {

  const server = express();

  const app = await NestFactory.create(AppModule,
    new ExpressAdapter(server),
  );

  const stage = process.env.STAGE
  //const configService = app.get(ConfigService);
  // const REDIS_HOST = configService.get<string>('REDIS_HOST');
  // const REDIS_PORT = configService.get<number>('REDIS_PORT');

  let privateKey;
  let certificate;
  if (stage == 'Production') {
    privateKey = fs.readFileSync('./.cerf/privkey.pem');
    certificate = fs.readFileSync('./.cerf/fullchain.pem');
  } else {
    privateKey = fs.readFileSync('./.cerf/localhost-key.pem');
    certificate = fs.readFileSync('./.cerf/localhost.pem');
  }

  const httpsOptions = { key: privateKey, cert: certificate };


  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: ["https://e-sport.cloud", "https://e-sport.cloud:4201", "http://localhost", "http://localhost:3001", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204
  });

  const port = process.env.PORT || 3001;
  const port_s = process.env.PORT_S || 3011;

  await app.init();

  http.createServer(server).listen(port);
  https.createServer(httpsOptions, server).listen(port_s);

  // await app.listen(port, () => console.log('API started at port ' + port));
}

bootstrap();
