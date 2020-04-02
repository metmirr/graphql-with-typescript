import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Author } from "../entities/Author";
import { CreateAuthor } from "../inputs/CreateAuthor";
import { GetAuthorArgs } from "../args/Author";

@Resolver()
export class AuthorResolver {
  @Query(returns => [Author])
  authors(@Args() { skip, take, email }: GetAuthorArgs) {
    if (email) {
      return Author.find({ email });
    }
    return Author.find({ skip, take });
  }

  @Mutation(returns => Author)
  async createAuthor(@Arg("data") data: CreateAuthor) {
    const author = Author.create(data);
    await author.save();
    return author;
  }
}
