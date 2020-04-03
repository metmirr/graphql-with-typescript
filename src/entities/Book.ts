import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String)
  @Column()
  title: string;

  @Field(type => String)
  @Column()
  author: string;

  @Field(type => Boolean)
  @Column({ default: false })
  isPublished: boolean;
}
