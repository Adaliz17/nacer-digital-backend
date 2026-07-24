import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 3001;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  app.enableCors({
    origin: frontendUrl,
    methods: ["GET"],
  });

  await app.listen(port, "0.0.0.0");
}

void bootstrap();
