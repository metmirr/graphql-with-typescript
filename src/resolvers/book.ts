import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Book } from "../entities/Book";
import { CreateBook } from "../inputs/CreateBook";

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  books() {
    return Book.find();
  }

  @Mutation(() => Book)
  async createBook(@Arg("data") data: CreateBook) {
    const book = Book.create(data);
    await book.save();
    return book;
  }
}
