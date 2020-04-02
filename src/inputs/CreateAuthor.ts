import { InputType, Field } from "type-graphql";
import { Author } from "../entities/Author";

/**
 * Use this class to create new Author objects
 * Ensure we don't accidentally change the property type by using Partial
 */
@InputType()
export class CreateAuthorInput implements Partial<Author> {
  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;
}
