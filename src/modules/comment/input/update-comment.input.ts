import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateCommentInput } from "@modules/comment/input/create-comment.input";
import { IsString, IsUUID } from "class-validator";

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
}
