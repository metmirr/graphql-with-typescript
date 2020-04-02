import { ArgsType, Field, Int, Args } from "type-graphql";
import { Max } from "class-validator";

@ArgsType()
export class GetBookArgs {
  @Field(type => Int, { defaultValue: 0 })
  skip?: number;

  @Field(type => Int, { nullable: true })
  @Max(25, { message: "Can not take more than 25 at once" })
  take?: number;

  @Field(type => String, { nullable: true })
  title?: string;
}
