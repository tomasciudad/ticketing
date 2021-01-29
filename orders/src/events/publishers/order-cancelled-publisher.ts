import { Publisher, OrderCancelledEvent, Subjects } from '@tcticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}