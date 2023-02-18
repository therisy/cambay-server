import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentModel } from "@modules/comment/model/comment.model";
import { AppJwtModule } from "@diverse/jwt/jwt.module";
import { AppQueueModule } from "@diverse/queue/queue.module";
import { UserService } from "@modules/user/service/user.service";
import { UserModel } from "@modules/user/model/user.model";
import { PostService } from "@modules/post/service/post.service";
import { PostModel } from "@modules/post/model/post.model";

@Module({
  imports: [
    AppQueueModule,
    AppJwtModule,
    TypeOrmModule.forFeature([CommentModel, UserModel, PostModel])
  ],
  providers: [CommentService, CommentResolver, UserService, PostService]
})
export class CommentModule {}
