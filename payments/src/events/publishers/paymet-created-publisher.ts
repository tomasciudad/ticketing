import { Subjects, Publisher, PaymentCreatedEvent } from '@tcticketing/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  
}