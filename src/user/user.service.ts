import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { isAxiosError } from "axios";
import { firstValueFrom } from "rxjs";
import type { GitHubUserResponse, UserProfile } from "./user.types";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly httpService: HttpService) {}

  async getUser(username: string): Promise<UserProfile> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<GitHubUserResponse>(
          `https://api.github.com/users/${encodeURIComponent(username)}`,
        ),
      );

      return {
        login: data.login,
        id: data.id,
        node_id: data.node_id,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
        type: data.type,
        site_admin: data.site_admin,
        name: data.name,
        company: data.company,
        blog: data.blog,
        location: data.location,
        email: data.email,
        hireable: data.hireable,
        bio: data.bio,
        twitter_username: data.twitter_username,
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status === 404) {
        throw new NotFoundException(
          `El usuario de GitHub "${username}" no existe.`,
        );
      }

      this.logger.error(
        `Error al consultar el usuario de GitHub "${username}".`,
        error instanceof Error ? error.stack : undefined,
      );
      throw new BadGatewayException(
        "No fue posible consultar el perfil en GitHub.",
      );
    }
  }
}
