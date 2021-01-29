import { Publisher, Subjects, TicketUpdatedEvent } from '@tcticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  subject: Subjects.TicketUpdated= Subjects.TicketUpdated;
}