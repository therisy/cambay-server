import {  Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AppJwtService {
  constructor(
    private readonly jwtService: JwtService
  ) {
  }

  generateToken(id, username) {
    return this.jwtService.sign({ id, username });
  }

  verifyToken(token) {
    return this.jwtService.verifyAsync(token).catch(() => null);
  }
}
