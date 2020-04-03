import { InputType, Field } from "type-graphql";
import { Book, Author } from "../entities";

@InputType()
export class UpdateBookInput implements Partial<Book> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  authorid: number;

  @Field({ nullable: true })
  isPublished?: boolean;
}
