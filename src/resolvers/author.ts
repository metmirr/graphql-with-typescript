import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Author } from "../entities/Author";
import { CreateAuthor } from "../inputs/CreateAuthor";

@Resolver()
export class AuthorResolver {
  @Query(() => [Author])
  authors() {
    return Author.find();
  }

  @Query(() => Author, { nullable: true })
  getAuthorByEmail(@Arg("email") email: string) {
    const author = Author.findOne({ email: email });
    return author;
  }

  // @Mutation(() => Author)
  // async createAuthor(@Arg("data") data: CreateAuthor) {
  //   const author = Author.create(data);
  //   await author.save();
  //   return author;
  // }

  @Mutation(() => Author)
  async createAuthor(
    @Arg("email") email: string,
    @Arg("firstname") firstname: string,
    @Arg("lastname") lastname: string
  ) {
    const author = Author.create({ email, firstname, lastname });
    await author.save();
    return author;
  }
}
