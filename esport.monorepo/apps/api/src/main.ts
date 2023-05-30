/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as fs from 'fs';
import * as path from 'path';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

const configureServer = () => {
  let httpsOptions = null;
  const isNotDev = ['Local', 'Production'].includes(process.env.STAGE);

  if (isNotDev) {
    const keyPath = process.env.SSL_KEY_NAME || '';
    const certPath = process.env.SSL_CERT_NAME || '';
    httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, '../../..', '.cerfs', keyPath)),
      cert: fs.readFileSync(
        path.join(__dirname, '../../..', '.cerfs', certPath)
      ),
    };
  }

  return { httpsOptions, isNotDev };
};

async function bootstrap() {
  const { isNotDev, httpsOptions } = configureServer();

  const app = await NestFactory.create(AppModule, { httpsOptions });
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: ['https://localhost:3000', 'http://localhost:3000'],
    credentials: true,
  });
  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${
      isNotDev ? 'https' : 'http'
    }://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
