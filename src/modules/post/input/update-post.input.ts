import { Field, InputType, PartialType } from "@nestjs/graphql";
import { Column } from "typeorm";
import { CreatePostInput } from "@modules/post/input/create-post.input";
import { IsString, IsUUID } from "class-validator";

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => String, { description: 'Post id' })
  @Column({
    type: 'uuid'
  })
  @IsUUID()
  @IsString()
  id: string;
}
