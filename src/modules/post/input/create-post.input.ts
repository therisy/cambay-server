import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEnum, MaxLength, MinLength } from "class-validator";
import { Category } from "@core/enum/category.enum";

@InputType()
export class CreatePostInput {
  @Field()
  @MaxLength(30)
  @MinLength(3)
  name: string;

  @Field()
  @MaxLength(30)
  @MinLength(3)
  description: string;

  @Field(() => [Number])
  @IsArray()
  @IsEnum(Category, { each: true })
  categories: number[];
}
