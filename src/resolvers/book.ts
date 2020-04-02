import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { Book } from "../entities/Book";
import { CreateBook } from "../inputs/CreateBook";
import { GetBookArgs } from "../args/Book";

@Resolver(of => Book)
export class BookResolver {
  @Query(returns => [Book])
  books(@Args() { skip, take, title }: GetBookArgs) {
    if (title) {
      return Book.find({ where: { title } });
    }
    return Book.find({ skip, take });
  }

  @Mutation(returns => Book)
  async createBook(@Arg("data") data: CreateBook) {
    const book = Book.create(data);
    await book.save();
    return book;
  }
}
