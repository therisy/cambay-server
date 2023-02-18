import { Field, ID, InputType } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "class-validator";

@InputType()
export class DeleteCommentInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => ID)
  @IsUUID()
  post: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  parent: string;
}
