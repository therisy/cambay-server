import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import CONFIG from "@config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(CONFIG.PORT);
  Logger.log(`Server running on ${await app.getUrl()}`, "Bootstrap");
}

bootstrap();
