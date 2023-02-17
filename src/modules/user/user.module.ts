import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './service/user.service';
import { AppQueueModule } from "@modules/diverse/queue/queue.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "@modules/user/model/user.model";
import { AppThrottlerModule } from "@diverse/throttler/throttler.module";
import { AppJwtModule } from "@diverse/jwt/jwt.module";

@Module({
  imports: [
    AppQueueModule,
    AppThrottlerModule,
    AppJwtModule,
    TypeOrmModule.forFeature([UserModel])
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
