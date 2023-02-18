import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword, MaxLength, Min, MinLength } from "class-validator";

@InputType()
export class UpdateMyPasswordInput {
  @Field()
  @IsStrongPassword()
  @MaxLength(30)
  @MinLength(3)
  oldPassword: string;

  @Field()
  @IsStrongPassword()
  @MaxLength(30)
  @MinLength(3)
  newPassword: string;


  @Field()
  @IsStrongPassword()
  @MaxLength(30)
  @MinLength(3)
  confirmPassword: string;
}
