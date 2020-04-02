import { InputType, Field } from "type-graphql";
import { Book } from "../entities";

@InputType()
export class UpdateBookInput implements Partial<Book> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  isPublished?: boolean;
}
