import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword, MaxLength, Min, MinLength } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @MaxLength(30)
  @MinLength(3)
  email: string;

  @Field()
  @IsStrongPassword()
  @MaxLength(30)
  @MinLength(3)
  password: string;
}
