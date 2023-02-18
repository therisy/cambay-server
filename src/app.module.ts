import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from "@nestjs/apollo";
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

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql.schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: CONFIG.POSTGRES.DATABASE,
      host: CONFIG.POSTGRES.HOST,
      port: CONFIG.POSTGRES.PORT,
      username: CONFIG.POSTGRES.USER,
      password: CONFIG.POSTGRES.PASSWORD,
      entities: [UserModel, PostModel, VoteModel],
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
  ],
  providers: [AppResolver],
})
export class AppModule {}
