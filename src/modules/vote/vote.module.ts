import { Module } from '@nestjs/common';
import { VoteResolver } from './vote.resolver';
import { VoteService } from './service/vote.service';
import { AppJwtModule } from "@diverse/jwt/jwt.module";
import { UserService } from "@modules/user/service/user.service";
import { AppQueueModule } from "@diverse/queue/queue.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "@modules/user/model/user.model";
import { VoteModel } from "@modules/vote/model/vote.model";
import { PostModel } from "@modules/post/model/post.model";
import { PostService } from "@modules/post/service/post.service";

@Module({
  imports: [
    AppQueueModule,
    AppJwtModule,
    TypeOrmModule.forFeature([UserModel, VoteModel, PostModel]),
  ],
  providers: [VoteResolver, VoteService, UserService, PostService]
})
export class VoteModule {}
