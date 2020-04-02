import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Author } from "../entities/Author";
import { CreateAuthor } from "../inputs/CreateAuthor";
import { GetAuthorArgs } from "../args/Author";

@Resolver()
export class AuthorResolver {
  @Query(returns => [Author])
  authors(@Args() { skip, take }: GetAuthorArgs) {
    return Author.find({ skip: skip, take: take });
  }

  @Query(returns => Author, { nullable: true })
  getAuthorByEmail(@Arg("email") email: string) {
    const author = Author.findOne({ email: email });
    return author;
  }

  @Mutation(returns => Author)
  async createAuthor(@Arg("data") data: CreateAuthor) {
    const author = Author.create(data);
    await author.save();
    return author;
  }
}
