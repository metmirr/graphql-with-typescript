import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";

import { Author } from "../entities";
import { CreateAuthorInput } from "../inputs";
import { GetAuthorArgs } from "../args";

@Resolver(of => Author)
export class AuthorResolver {
  @Query(returns => [Author])
  async authors(@Args() { skip, take, email }: GetAuthorArgs) {
    if (email) {
      return await Author.find({
        where: { email: email },
        relations: ["books"]
      });
    }
    return await Author.find({ skip, take, relations: ["books"] });
  }

  @Mutation(returns => Author)
  async createAuthor(@Arg("data") data: CreateAuthorInput) {
    const author = Author.create(data);
    await author.save();
    return author;
  }
}
