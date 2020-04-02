import { ArgsType, Field, Int } from "type-graphql";
import { Max } from "class-validator";

@ArgsType()
export class GetAuthorArgs {
  @Field(type => Int, { defaultValue: 0 })
  skip?: number;

  @Field(type => Int, { nullable: true })
  @Max(25, { message: "Can not take more than 25 at once" })
  take?: number;
}
