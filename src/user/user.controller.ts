import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import type { UserProfile } from "./user.types";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":username")
  getUser(@Param("username") username: string): Promise<UserProfile> {
    return this.userService.getUser(username);
  }
}
