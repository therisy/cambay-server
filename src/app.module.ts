import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from 'path';
import { AppResolver } from "./app.resolver";
import CONFIG from "@config";
import { UserModel } from "@modules/user/model/user.model";
import { PostModel } from "@modules/post/model/post.model";
import { PostModule } from "@modules/post/post.module";
import { VoteModule } from "@modules/vote/vote.module";
import { UserModule } from './modules/user/user.module';
import { VoteModel } from "@modules/vote/model/vote.model";
import { CommentModel } from "@modules/comment/model/comment.model";
import { CommentModule } from "@modules/comment/comment.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql.schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        "subscriptions-transport-ws": true,
        "graphql-ws": true,
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: CONFIG.POSTGRES.DATABASE,
      host: CONFIG.POSTGRES.HOST,
      port: CONFIG.POSTGRES.PORT,
      username: CONFIG.POSTGRES.USER,
      password: CONFIG.POSTGRES.PASSWORD,
      entities: [UserModel, PostModel, VoteModel, CommentModel],
      synchronize: CONFIG.POSTGRES.SYNCHRONIZE === 'true',
      logging: CONFIG.POSTGRES.LOGGING === 'true',
      cache: {
        type: 'redis',
        options: {
          host: CONFIG.REDIS.HOST,
          port: CONFIG.REDIS.PORT,
        }
      }
    }),
    UserModule,
    PostModule,
    VoteModule,
    CommentModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
