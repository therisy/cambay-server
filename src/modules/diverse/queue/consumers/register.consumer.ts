import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { JobType } from "@modules/diverse/queue/type/job-type.enum";
import { QueueType } from "@modules/diverse/queue/type/queue-type.enum";
import { CreateUserInput } from "@modules/user/input/create-user.input";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "@modules/user/model/user.model";
import { Repository } from "typeorm";

@Processor(QueueType.REGISTER)
export class RegisterConsumer {
  constructor(
    @InjectRepository(UserModel) private readonly userRepository: Repository<UserModel>,
  ) {}

  @Process({ name: JobType.REGISTER, concurrency: 5 })
  async handleRegisterJob(job: Job<CreateUserInput>) {
    const user = await this.userRepository.create(job.data);

    return user.save();
  }
}
