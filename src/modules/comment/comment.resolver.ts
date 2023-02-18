import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { CommentModel } from "@modules/comment/model/comment.model";
import { CommentService } from "@modules/comment/service/comment.service";
import { CreateCommentInput } from "@modules/comment/input/create-comment.input";
import { User } from "@core/decorator/user.decorator";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@core/guard/auth.guard";
import { GqlThrottlerGuard } from "@diverse/throttler/guard/throttler.guard";
import { Throttle } from "@nestjs/throttler";
import { PubSub } from "graphql-subscriptions";
import { SubscriptionType } from "@core/constants/subscription";
import { UpdateCommentInput } from "@modules/comment/input/update-comment.input";
import { DeleteCommentInput } from "@modules/comment/input/delete-comment.input";

const pubSub = new PubSub();

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService
  ) {
  }

  @Mutation(() => CommentModel)
  @UseGuards(GqlThrottlerGuard, AuthGuard)
  @Throttle(50, 60)
  async createComment(@User() user, @Args("input") input: CreateCommentInput) {
    let result;
    if (!input.parent) {
      result = await this.commentService.createCommentForPost(input, user);
    } else {
      result = await this.commentService.createCommentForSubComment(input, user);
    }

    await pubSub.publish(SubscriptionType.COMMENT_ADDED, { commentCreated: result });
    return result;
  }

  @Mutation(() => CommentModel)
  @UseGuards(GqlThrottlerGuard, AuthGuard)
  @Throttle(50, 60)
  async updateComment(@User() user, @Args("input") input: UpdateCommentInput): Promise<CommentModel> {
    const result = await this.commentService.updateComment(input, user);

    await pubSub.publish(SubscriptionType.COMMENT_UPDATED, { commentUpdated: result });
    return result;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlThrottlerGuard, AuthGuard)
  @Throttle(50, 60)
  async deleteComment(@User() user, @Args('input') input: DeleteCommentInput): Promise<boolean> {
    const result = await this.commentService.deleteComment(input, user);

    await pubSub.publish(SubscriptionType.COMMENT_DELETED, { commentDeleted: result });
    return !!result;
  }

  @Subscription(returns => CommentModel,
    {
      name: SubscriptionType.COMMENT_ADDED,
      filter: (payload, variables) => {
        return payload.commentCreated.id == variables.id || payload.commentCreated.id == variables.id;
      }
    })
  commentCreated(@Args("id") id: string) {
    return pubSub.asyncIterator(SubscriptionType.COMMENT_ADDED);
  }

  @Subscription(returns => CommentModel,
    {
      name: SubscriptionType.COMMENT_UPDATED,
      filter: (payload, variables) => {
        return payload.commentUpdated.post == variables.id || payload.commentUpdated.parent == variables.id;
      }
    })
  commentUpdated(@Args("id") id: string) {
    return pubSub.asyncIterator(SubscriptionType.COMMENT_UPDATED);
  }

  @Subscription(() => CommentModel,
    {
      name: SubscriptionType.COMMENT_DELETED,
      filter: (payload, variables) => {
        return payload.commentDeleted.post == variables.id || payload.commentDeleted.parent == variables.id;
      }
    })
  commentDeleted(@Args("id") id: string) {
    return pubSub.asyncIterator(SubscriptionType.COMMENT_DELETED);
  }
}
