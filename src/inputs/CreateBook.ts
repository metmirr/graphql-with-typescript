import { InputType, Field } from "type-graphql";
import { Book } from "../entities/Book";

/**
 * Use this class to create new Book objects
 * Ensure we don't accidentally change the property type by using Partial
 */
@InputType()
export class CreateBook implements Partial<Book> {
  @Field()
  title: string;

  @Field()
  author: string;
}
