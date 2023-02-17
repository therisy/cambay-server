import {
  Args,
  Mutation,
  Resolver
} from "@nestjs/graphql";
import { UserService } from './service/user.service';
import { CreateUserInput } from "./input/create-user.input";
import { UserModel } from "./model/user.model";
import { UseGuards } from "@nestjs/common";
import { GqlThrottlerGuard } from "@diverse/throttler/guard/throttler.guard";
import { LoginInput } from "@modules/user/input/login.input";
import { Throttle } from "@nestjs/throttler";

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Mutation(returns => UserModel)
  @UseGuards(GqlThrottlerGuard)
  @Throttle(10, 60)
  async createUser(@Args('user') user: CreateUserInput): Promise<UserModel> {
    return this.userService.createUser(user);
  }

  @Mutation(returns => String)
  @UseGuards(GqlThrottlerGuard)
  @Throttle(10, 60)
  async login(@Args('user') user: LoginInput): Promise<string> {
    return this.userService.login(user);
  }
}
