import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";

import { Author } from "../entities";
import { CreateAuthorInput } from "../inputs";
import { GetAuthorArgs } from "../args";

@Resolver(of => Author)
export class AuthorResolver {
  @Query(returns => [Author])
  authors(@Args() { skip, take, email }: GetAuthorArgs) {
    if (email) {
      return Author.find({ email });
    }
    return Author.find({ skip, take });
  }

  @Mutation(returns => Author)
  async createAuthor(@Arg("data") data: CreateAuthorInput) {
    const author = Author.create(data);
    await author.save();
    return author;
  }
}
