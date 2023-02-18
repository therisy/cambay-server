import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CreatePostInput } from "@modules/post/input/create-post.input";
import { ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { PostModel } from "@modules/post/model/post.model";
import { PostService } from "@modules/post/service/post.service";
import { GqlThrottlerGuard } from "@diverse/throttler/guard/throttler.guard";
import { AuthGuard } from "@core/guard/auth.guard";
import { Throttle } from "@nestjs/throttler";
import { UpdatePostInput } from "@modules/post/input/update-post.input";
import { PageValidationPipe } from "@core/pipe/page-validation.pipe";
import { VoteService } from "@modules/vote/service/vote.service";
import { VoteModel } from "@modules/vote/model/vote.model";

@Resolver(() => PostModel)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly voteService: VoteService

  ) {
  }

  @Query(() => [PostModel])
  @UseGuards(GqlThrottlerGuard)
  @Throttle(30, 60)
  async getNewPosts(@Args('page', PageValidationPipe) page: number): Promise<PostModel[]> {
    return this.postService.getNewPosts(page);
  }

  @Query(() => [PostModel])
  @UseGuards(GqlThrottlerGuard)
  @Throttle(30, 60)
  async getTopPosts(@Args('page', PageValidationPipe) page: number): Promise<PostModel[]> {
    return this.postService.getTopPosts();
  }

  @Query(() => PostModel)
  @UseGuards(GqlThrottlerGuard)
  @Throttle(15, 60)
  async getPostById(@Args("id", ParseUUIDPipe) id: string): Promise<PostModel> {
    return this.postService.getPostById(id);
  }

  @ResolveField()
  @UseGuards(GqlThrottlerGuard)
  @Throttle(15, 60)
  async votes(@Parent() { id }: PostModel): Promise<VoteModel[]> {
    return await this.voteService.getVotesByPostId(id)
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlThrottlerGuard, AuthGuard)
  @Throttle(30, 60)
  async createPost(@Args("post") post: CreatePostInput): Promise<PostModel> {
    return this.postService.createPost(post);
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlThrottlerGuard, AuthGuard)
  @Throttle(30, 60)
  async updatePost(@Args("post") post: UpdatePostInput): Promise<PostModel> {
    return this.postService.updatePost(post);
  }
}
