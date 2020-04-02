import { ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Author extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(type => String)
  @Column()
  email: string;

  @Field(type => String)
  @Column()
  firstname: string;

  @Field(type => String)
  @Column()
  lastname: string;
}
