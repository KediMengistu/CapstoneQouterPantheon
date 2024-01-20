import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rateLimiter } from './middleware/rate-limiter.middleware';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(rateLimiter);

  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger();

  const config = new DocumentBuilder()
    .setTitle('Patheon Pricer')
    .setDescription(
      'Pantheon Pricer api used to generate accurate quotes instantly and accurately while streamlining their order management process.',
    )
    .setVersion('1.0')
    .addTag('pantheon-pricer')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
