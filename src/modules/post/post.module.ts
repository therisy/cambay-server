import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostModel } from "@modules/post/model/post.model";
import { AppJwtModule } from "@diverse/jwt/jwt.module";
import { UserService } from "@modules/user/service/user.service";
import { AppQueueModule } from "@diverse/queue/queue.module";
import { UserModel } from "@modules/user/model/user.model";
import { VoteService } from "@modules/vote/service/vote.service";
import { VoteModel } from "@modules/vote/model/vote.model";
import { CommentService } from "@modules/comment/service/comment.service";
import { CommentModel } from "@modules/comment/model/comment.model";

@Module({
  imports: [
    AppJwtModule,
    AppQueueModule,
    TypeOrmModule.forFeature([UserModel, PostModel, VoteModel, CommentModel]),
  ],
  providers: [PostService, PostResolver, UserService, VoteService, CommentService]
})
export class PostModule {}
