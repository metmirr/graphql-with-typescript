import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Args,
  PubSub,
  PubSubEngine,
  Subscription,
  Root
} from "type-graphql";

import { Book, Author } from "../entities";
import { CreateBookInput, UpdateBookInput } from "../inputs";
import { GetBookArgs } from "../args";
import { NotificationPayload, Notification, Topics } from "../notifications";

@Resolver(of => Book)
export class BookResolver {
  @Query(returns => [Book])
  async books(@Args() { skip, take, title }: GetBookArgs) {
    if (title) {
      return await Book.find({ where: { title }, relations: ["author"] });
    }
    return await Book.find({ skip, take, relations: ["author"] });
  }

  @Mutation(returns => Book)
  async createBook(
    @Arg("data") data: CreateBookInput,
    @PubSub() pubSub: PubSubEngine
  ) {
    const author = await Author.findOne({ where: { id: data.authorid } });
    if (!author) throw new Error("Author not found!");

    const book = Book.create(data);
    book.author = author;
    await book.save();

    const payload: NotificationPayload = {
      id: book.id,
      message: `A new book published! The book has ${book.title} title`
    };
    await pubSub.publish(Topics.NEWBOOKPUBLISHED, payload);

    return book;
  }

  @Mutation(returns => Book)
  async updateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error("Book not found!");

    Object.assign(book, data);
    await book.save();
    return book;
  }

  @Subscription({
    topics: Topics.NEWBOOKPUBLISHED
  })
  newNotification(@Root() notifPayload: NotificationPayload): Notification {
    return {
      ...notifPayload,
      date: new Date()
    };
  }
}
