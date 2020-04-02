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

import { Book } from "../entities/Book";
import { CreateBook } from "../inputs/CreateBook";
import { GetBookArgs } from "../args/Book";
import { NewNotificationArgs } from "../args/Notification";
import { NotificationPayload, Notification } from "../notifications/book";
import { Topics } from "../notifications/topics";

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
    @Arg("data") data: CreateBook,
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

  @Subscription({
    topics: Topics.NEWBOOKPUBLISHED
  })
  newNotification(
    @Root() notifPayload: NotificationPayload,
    @Args() { id, message }: NewNotificationArgs
  ): Notification {
    return {
      ...notifPayload,
      date: new Date()
    };
  }
}
