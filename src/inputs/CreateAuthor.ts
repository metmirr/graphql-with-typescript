import { InputType, Field } from "type-graphql";

@InputType()
export class CreateAuthor {
  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;
}
