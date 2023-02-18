import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { BaseModel } from "@core/model";
import { VoteModel } from "@modules/vote/model/vote.model";
import { CommentModel } from "@modules/comment/model/comment.model";

@ObjectType()
@Entity()
export class PostModel extends BaseModel {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [Number])
  @Column("int", { array: true })
  categories: number[];

  @Field()
  @Column({ default: false })
  ready: boolean;

  @Field(() => [VoteModel])
  votes: VoteModel[];

  @Field(() => [CommentModel])
  comments: CommentModel[];
}
