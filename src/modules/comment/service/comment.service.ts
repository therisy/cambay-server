import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentInput } from "@modules/comment/input/create-comment.input";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentModel } from "@modules/comment/model/comment.model";
import { Repository } from "typeorm";
import { PostService } from "@modules/post/service/post.service";
import { UpdateCommentInput } from "@modules/comment/input/update-comment.input";
import { DeleteCommentInput } from "@modules/comment/input/delete-comment.input";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentModel) private readonly commentRepository: Repository<CommentModel>,
    private readonly postService: PostService
  ) {
  }

  async getCommentsByPostId(id: string, page): Promise<CommentModel[]> {
    const skip = (page - 1) * 15;
    return await this.commentRepository.find({
      where: {
        post: id
      },
      skip,
      take: 15,
    });
  }

  async createCommentForPost(input: CreateCommentInput, user) {
    const post = await this.postService.getPostById(input.parent);
    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const count = await this.commentRepository.count({
      where: { post: input.post, user: user.id }
    });
    if (count > 5) {
      throw new BadRequestException("Post has more than 5 comments");
    }

    const model = this.commentRepository.create({
      post: input.post,
      user: user.id,
      content: input.content
    });

    return await model.save();
  }

  async createCommentForSubComment(input: CreateCommentInput, user) {
    const post = await this.postService.getPostById(input.parent);
    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const comment = await this.commentRepository.findOne({
      where: { id: input.parent, post: input.post }
    });
    if (!comment) {
      throw new NotFoundException("Parent Comment not found");
    }

    const model = this.commentRepository.create({
      post: input.post,
      parent: input.parent,
      user: user.id,
      content: input.content
    });

    return await model.save();
  }

  async updateComment(input: UpdateCommentInput, user) {
    const comment = await this.commentRepository.findOne({
      where: { id: input.id, post: input.post, user: user.id }
    });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    comment.content = input.content;
    return await comment.save();
  }

  async deleteComment(input: DeleteCommentInput, user) {
    const comment = await this.commentRepository.findOne({
      where: { id: input.id, post: input.post, user: user.id }
    });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    const clone = { ...comment };

    await comment.remove();

    return clone;
  }
}
