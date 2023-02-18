import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import CONFIG from "@config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Delete properties which is not in dto
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
    })
  )

  await app.listen(CONFIG.PORT);
  Logger.log(`Server running on ${await app.getUrl()}`, "Bootstrap");
}

bootstrap();
