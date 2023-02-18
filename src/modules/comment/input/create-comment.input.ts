import { Field, ID, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateCommentInput {
  @Field()
  @IsString()
  @MaxLength(600)
  @MinLength(3)
  content: string;

  @Field(() => ID)
  @IsUUID()
  post: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  parent: string;
}
