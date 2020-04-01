import { InputType, Field } from "type-graphql";

@InputType()
export class CreateBook {
  @Field()
  title: string;

  @Field()
  author: string;
}
