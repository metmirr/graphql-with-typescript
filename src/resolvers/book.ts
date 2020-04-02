import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Book } from "../entities/Book";
import { CreateBook } from "../inputs/CreateBook";

@Resolver()
export class BookResolver {
  @Query(returns => [Book])
  books() {
    return Book.find();
  }

  @Mutation(returns => Book)
  async createBook(@Arg("data") data: CreateBook) {
    const book = Book.create(data);
    await book.save();
    return book;
  }
}
