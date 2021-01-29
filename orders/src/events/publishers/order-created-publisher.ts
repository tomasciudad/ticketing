import { Publisher, OrderCreatedEvent, Subjects } from '@tcticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}