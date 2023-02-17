import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import CONFIG from "@config";

@Module({
  imports: [
    JwtModule.register({
      secret: CONFIG.JWT.SECRET,
      signOptions: {
        expiresIn: CONFIG.JWT.EXPIRES_IN
      }
    })
  ],
  exports: [JwtModule]
})
export class AppJwtModule {}
