import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { sessionConfig } from '@config/session/session.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Prefix
  app.setGlobalPrefix("/api")

  //GLOBAL VALIDATION PIPE
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    exceptionFactory: (errors) => fromArrayToJson(errors)
  }))

  //SESSION 
  app.use(sessionConfig)

  //CORS
  app.enableCors({ origin: process.env.CORS, credentials: true })

  await app.listen(process.env.PORT);
}

bootstrap();

function fromArrayToJson(errors: ValidationError[]) {
  const newArrayOfError = errors.map(
    (currentError) => { return { [currentError.property]: currentError.constraints[Object.keys(currentError.constraints)[0]] } }
  )
  return new BadRequestException(newArrayOfError)
}