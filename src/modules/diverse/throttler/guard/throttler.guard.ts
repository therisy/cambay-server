import { ThrottlerGuard } from "@nestjs/throttler";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getArgByIndex(2)
    return { req: ctx.req, res: ctx.req.res };
  }
}
