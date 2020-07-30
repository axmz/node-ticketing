import { Publisher, OrderCreatedEvent, Subjects } from '@axmztickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
