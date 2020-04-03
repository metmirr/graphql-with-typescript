import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export class NewNotificationArgs {
  @Field(type => ID)
  id: number;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  date?: Date;
}
