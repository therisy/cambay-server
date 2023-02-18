import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "@core/enum/category.enum";
import { CreatePostInput } from "@modules/post/input/create-post.input";
import { InjectRepository } from "@nestjs/typeorm";
import { PostModel } from "@modules/post/model/post.model";
import { MoreThan, Repository } from "typeorm";
import { UpdatePostInput } from "@modules/post/input/update-post.input";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostModel) private readonly postRepository: Repository<PostModel>
  ) {
  }

  async getNewPosts(page: number): Promise<PostModel[]> {
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const skip = (page - 1) * 2;

    return await this.postRepository.find({
      where: {
        createdAt: MoreThan(date),
        ready: false
      },
      skip,
      take: 2
    });
  }

  async getTopPosts(): Promise<PostModel[]> {
    const model = await this.postRepository.find({
      where: {
        ready: true
      }
    });

    return model;
  }

  async getPostById(id): Promise<PostModel> {
    const model = await this.postRepository.findOne({
      where: {
        id,
        ready: false
      }
    });

    if (!model) {
      throw new NotFoundException("Post not found");
    }

    return model;
  }

  async createPost(post: CreatePostInput): Promise<PostModel> {
    const values = Object.values(Category);
    const match = post.categories.every(category => values.includes(category));
    if (!match) {
      throw new BadRequestException("Invalid category");
    }

    const model = await this.postRepository.create({
      ...post,
      ready: false
    });

    return await model.save();
  }

  async updatePost(post: UpdatePostInput): Promise<PostModel> {
    const values = Object.values(Category);
    if (post.categories.length > 0) {
      const match = post.categories.every(category => values.includes(category));
      if (!match) {
        throw new BadRequestException("Invalid category");
      }
    }

    const model = await this.postRepository.findOne({
      where: { id: post.id }
    });

    if (!model) {
      throw new BadRequestException("Post not found");
    }

    if (post.description) model.description = post.description;
    if (post.name) model.name = post.name;
    if (post.categories) model.categories = post.categories;

    return await model.save();
  }
}
