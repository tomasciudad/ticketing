import { Publisher, Subjects, TicketCreatedEvent } from '@tcticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

