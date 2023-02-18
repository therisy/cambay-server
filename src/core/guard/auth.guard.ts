import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AppJwtService } from "@diverse/jwt/jwt.service";
import { UserService } from "@modules/user/service/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: AppJwtService,
    private readonly userService: UserService,
  ) {
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const authorization = req.headers.authorization;
    if (!authorization) return false;

    const token = authorization.split(' ')[1];
    if (!token) return false;

    const user = await this.jwtService.verifyToken(token);
    if (!user) return false;

    const model = await this.userService.getUserById(user.id);
    if (!model) return false;

    req.user = JSON.parse(JSON.stringify(model, ['id', 'username', 'email', 'createdAt', 'updatedAt']));

    return true;
  }
}
