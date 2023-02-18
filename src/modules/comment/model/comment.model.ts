import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseModel } from "@core/model";
import { PostModel } from "@modules/post/model/post.model";

@ObjectType()
@Entity()
export class CommentModel extends BaseModel {
  @Field(() => ID)
  @Column({ type: "uuid" })
  user: string;

  @Field()
  @Column({ type: "text" })
  content: string;

  @Field(() => ID)
  @Column({ type: "uuid" })
  post: string;

  @Field()
  @Column({ type: "uuid", nullable: true })
  parent: string;
}
