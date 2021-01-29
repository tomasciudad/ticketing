import { Listener, OrderCancelledEvent, Subjects} from '@tcticketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName} from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg:Message){
    const ticket = await Ticket.findById(data.ticket.id);

    // if no ticket, throw error
    if (!ticket){
      throw new Error('Ticket not found');
    }
    // mark the ticket as not being reserve
    ticket.set({orderId: undefined});

    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id:ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version
    });
    msg.ack();
  }
}