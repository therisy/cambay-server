import { Module } from '@nestjs/common';
import { ThrottlerModule } from "@nestjs/throttler";
import CONFIG from "@config";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: CONFIG.RATE_LIMIT.TTL,
      limit: CONFIG.RATE_LIMIT.LIMIT,
    }),
  ],
})
export class AppThrottlerModule {}
