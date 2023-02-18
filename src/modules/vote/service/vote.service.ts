import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VoteModel } from "@modules/vote/model/vote.model";
import { Repository } from "typeorm";
import { PostService } from "@modules/post/service/post.service";

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteModel) private readonly voteRepository: Repository<VoteModel>,
    private readonly postService: PostService
  ) {
  }

  async getVotesByPostId(id: string): Promise<VoteModel[]> {
    return await this.voteRepository.find({
      where: {
        post: id
      }
    });
  }

  async vote(id, isVoted, user): Promise<boolean> {
    const model = await this.postService.getPostById(id);
    if (!model) {
      throw new NotFoundException("Post not found");
    }

    const exists = await this.voteRepository.findOne({
      where: { post: id, user: user.id }
    });

    if (exists) {
      await this.voteRepository.delete({ post: id, user: user.id });

      return false;
    }

    const vote = this.voteRepository.create({
      isVoted: isVoted || true,
      post: model.id,
      user: user.id
    });

    await vote.save();

    return true;
  }
}
