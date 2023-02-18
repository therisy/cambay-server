import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VoteModel } from "@modules/vote/model/vote.model";
import typeorm_2, { Repository } from "typeorm";
import { PostService } from "@modules/post/service/post.service";

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteModel) private readonly voteRepository: Repository<VoteModel>,
    private readonly postService: PostService
  ) {
  }

  async getVotesByPostId(id: string, page: number): Promise<VoteModel[]> {
    const skip = (page - 1) * 15;
    return await this.voteRepository.find({
      where: {
        post: id
      },
      skip,
      take: 15,
    });
  }

  async vote(id, isVoted, user) {
    const model = await this.postService.getPostById(id);
    if (!model) {
      throw new NotFoundException("Post not found");
    }

    const exists = await this.voteRepository.findOne({
      where: { post: id, user: user.id }
    });

    if (exists) {
      exists.isVoted = !exists.isVoted;
      await exists.save();

      return {
        data: exists,
        isVoted: exists.isVoted
      }
    }

    const vote = this.voteRepository.create({
      isVoted: isVoted || true,
      post: model.id,
      user: user.id
    });

    await vote.save();

    return {
      data: vote,
      isVoted: isVoted
    }
  }
}
