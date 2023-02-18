import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

const httpsOptions = {
  key: fs.readFileSync('./secrets/private-key.pem'),
  cert: fs.readFileSync('./secrets/public-certificate.pem'),
};

async function bootstrap() {

  const privateKey = fs.readFileSync('./.cerf/privkey.pem');
  const certificate = fs.readFileSync('./.cerf/fullchain.pem');
  const httpsOptions = {key: privateKey, cert: certificate};

  const server = express();

  const app = await NestFactory.create(AppModule, 
    new ExpressAdapter(server),
  );


  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: ["https://e-sport.cloud", "https://e-sport.cloud:4201", "http://localhost"],
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
