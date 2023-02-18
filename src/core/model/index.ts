import {
  BaseEntity, BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  SaveOptions,
  UpdateDateColumn
} from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  BadRequestException,
  ConflictException,
  Logger,
  NotFoundException
} from "@nestjs/common";
import { GraphQLTimestamp } from "@nestjs/graphql/dist/scalars/timestamp.scalar";
import { BeforeUpdate } from "typeorm/browser";

@ObjectType()
export class BaseModel extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field(() => GraphQLTimestamp)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLTimestamp)
  @UpdateDateColumn()
  updatedAt: Date;

  async save(options?: SaveOptions): Promise<this> {
    const saved = await super.save(options).catch((err) => {
      if (err.code === "23505") {
        throw new ConflictException(err.detail);
      }

      throw new BadRequestException(err.message);
    })

    saved.createdAt = new Date(saved.createdAt);
    saved.updatedAt = new Date(saved.updatedAt);

    return saved;
  }
}
