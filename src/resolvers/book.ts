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

import { Book } from "../entities";
import { CreateBookInput, UpdateBookInput } from "../inputs";
import { GetBookArgs, NewNotificationArgs } from "../args";
import { NotificationPayload, Notification, Topics } from "../notifications";

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
  async createBook(
    @Arg("data") data: CreateBookInput,
    @PubSub() pubSub: PubSubEngine
  ) {
    const book = Book.create(data);
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
