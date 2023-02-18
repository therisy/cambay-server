import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import CONFIG from "@config";
import { AppJwtService } from "@diverse/jwt/jwt.service";
import { UserService } from "@modules/user/service/user.service";

@Module({
  imports: [
    JwtModule.register({
      secret: CONFIG.JWT.SECRET,
      signOptions: {
        expiresIn: CONFIG.JWT.EXPIRES_IN
      }
    })
  ],
  exports: [JwtModule, AppJwtService],
  providers: [AppJwtService],
})
export class AppJwtModule {}
