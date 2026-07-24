import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5_000,
      maxRedirects: 0,
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "github-profile-nestjs-app",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
