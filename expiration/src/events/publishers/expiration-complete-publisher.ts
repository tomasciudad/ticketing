import { Publisher, ExpirationCompleteEvent, Subjects } from '@tcticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}