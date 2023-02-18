import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Throttle } from "@nestjs/throttler";
import { ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@core/guard/auth.guard";
import { VoteModel } from "@modules/vote/model/vote.model";
import { GqlThrottlerGuard } from "@diverse/throttler/guard/throttler.guard";
import { VoteService } from "@modules/vote/service/vote.service";
import { User } from "@core/decorator/user.decorator";

@Resolver(() => VoteModel)
export class VoteResolver {
  constructor(
    private readonly voteService: VoteService
  ) {
  }


  @Mutation(() => VoteModel)
  @UseGuards(AuthGuard, GqlThrottlerGuard)
  @Throttle(6, 60)
  async vote(
    @User() user,
    @Args("id", ParseUUIDPipe) id: string,
    @Args("isVoted", { type: () => Boolean, nullable: true }) isVoted?: boolean
  ): Promise<VoteModel> {
    return this.voteService.vote(id, isVoted, user);
  }
}
