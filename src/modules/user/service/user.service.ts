import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { CreateUserInput } from "../input/create-user.input";
import { UserModel } from "../model/user.model";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { QueueType } from "@modules/diverse/queue/type/queue-type.enum";
import { JobType } from "@modules/diverse/queue/type/job-type.enum";
import { LoginInput } from "@modules/user/input/login.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UpdateMyPasswordInput } from "@modules/user/input/update-my-password.input";
import { AppJwtService } from "@diverse/jwt/jwt.service";

@Injectable()
export class UserService {
  constructor(
    @InjectQueue(QueueType.REGISTER) private readonly registerQueue: Queue,
    @InjectRepository(UserModel) private readonly userRepository: Repository<UserModel>,
    private readonly jwtService: AppJwtService,
  ) {
  }

  getUserById(id: number): Promise<UserModel> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(data: CreateUserInput) {
    const job = await this.registerQueue.add(JobType.REGISTER, data, { backoff: 1000 });

    const user: UserModel = await job.finished()
      .catch((err) => {
        throw new ConflictException(err.message);
      });

    user.createdAt = new Date(user.createdAt);
    user.updatedAt = new Date(user.updatedAt);

    return user;
  }

  async login(user: LoginInput): Promise<string> {
    const userExists = await this.userRepository.findOne({ where: { email: user.email } });
    if (!userExists) {
      throw new NotFoundException("User not found");
    }

    const matchPassword = await bcrypt.compare(user.password, userExists.password);
    if (!matchPassword) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.jwtService.generateToken(userExists.id, userExists.username);
  }

  async updateMyPassword(user, password: UpdateMyPasswordInput): Promise<string> {
    if (!user) throw new UnauthorizedException("Unauthorized");

    const userExists = await this.userRepository.findOne({
      where: {
        id: user.id
      }
    });

    if (!userExists) {
      throw new NotFoundException("User not found");
    }

    const matchPassword = await bcrypt.compare(password.oldPassword, userExists.password);
    if (!matchPassword) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (password.newPassword !== password.confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password.newPassword, salt);

    await this.userRepository.update(user.id, { password: hash });

    return this.jwtService.generateToken(userExists.id, userExists.username);
  }
}
