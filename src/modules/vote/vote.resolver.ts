import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { Throttle } from "@nestjs/throttler";
import { ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@core/guard/auth.guard";
import { VoteModel } from "@modules/vote/model/vote.model";
import { GqlThrottlerGuard } from "@diverse/throttler/guard/throttler.guard";
import { VoteService } from "@modules/vote/service/vote.service";
import { User } from "@core/decorator/user.decorator";
import { SubscriptionType } from "@core/constants/subscription";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();

@Resolver(() => VoteModel)
export class VoteResolver {
  constructor(
    private readonly voteService: VoteService
  ) {}

  @Mutation(() => Boolean, {description: "If true, it is voted for, if false, it is deleted."})
  @UseGuards(AuthGuard, GqlThrottlerGuard)
  @Throttle(6, 60)
  async vote(
    @User() user,
    @Args("id", ParseUUIDPipe) id: string,
    @Args("isVoted", { type: () => Boolean, nullable: true }) isVoted?: boolean
  ): Promise<boolean> {
    const result = await this.voteService.vote(id, isVoted, user);

    await pubSub.publish(SubscriptionType.VOTE_UPDATED, { voteUpdated: result.data });
    return result.isVoted;
  }

  @Subscription(returns => VoteModel,
    {
      filter: (payload, variables) => {
        return payload.voteUpdated.post == variables.post;
      }
    })
  voteUpdated(@Args("post") post: string) {
    return pubSub.asyncIterator(SubscriptionType.VOTE_UPDATED);
  }
}
