import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { Author } from "./Author";

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String)
  @Column()
  title: string;

  @Field(type => Boolean)
  @Column({ default: false })
  isPublished: boolean;

  @Field(type => Author)
  @ManyToOne(
    type => Author,
    (author: Author) => author.books
  )
  author: Author;
}
