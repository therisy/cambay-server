import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from "@nestjs/apollo";
import { UserModule } from './modules/user/user.module';
import { join } from 'path';
import { AppResolver } from "./app.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import CONFIG from "@config";
import { UserModel } from "@modules/user/model/user.model";

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
      entities: [UserModel],
      synchronize: true,
      logging: false,
    }),
    UserModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
