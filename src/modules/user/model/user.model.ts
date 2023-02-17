import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, Index } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BaseModel } from "@core/model";

@ObjectType()
@Entity()
@Index(['email', 'username'], { unique: true })
export class UserModel extends BaseModel {
  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
