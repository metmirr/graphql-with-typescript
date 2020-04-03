import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { Book } from "./Book";

@Entity()
@ObjectType()
export class Author extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String)
  @Column()
  email: string;

  @Field(type => String)
  @Column()
  firstname: string;

  @Field(type => String)
  @Column()
  lastname: string;

  @Field(type => [Book])
  @OneToMany(
    type => Book,
    (book: Book) => book.author
  )
  books?: Book[];
}
