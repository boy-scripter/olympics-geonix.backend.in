import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import { sessionConfig } from '@config/session/session.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("/api")

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    exceptionFactory: (errors) => fromArrayToJson(errors)
  }))
  // app.use(sessionConfig)

  await app.listen(process.env.PORT);
}


function fromArrayToJson(errors: ValidationError[]) {
  const newArrayOfError = errors.map(
    (currentError) => { return { [currentError.property]: currentError.constraints[Object.keys(currentError.constraints)[0]] } }
  )
  return new BadRequestException(newArrayOfError)
}

bootstrap();
