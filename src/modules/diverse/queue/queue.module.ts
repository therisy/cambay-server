import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueOptions } from 'bull';
import CONFIG from "@config";
import { RegisterConsumer } from "@modules/diverse/queue/consumers/register.consumer";
import { QueueType } from "@modules/diverse/queue/type/queue-type.enum";
import queueSettings from "@core/constants/queue";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "@modules/user/model/user.model";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: CONFIG.REDIS.HOST,
        port: CONFIG.REDIS.PORT,
      },
    }),
    BullModule.registerQueue({
      name: QueueType.REGISTER,
      ...queueSettings,
    }),
    TypeOrmModule.forFeature([UserModel])
  ],
  exports: [BullModule],
  providers: [RegisterConsumer],
})
export class AppQueueModule {}
