import { Listener, OrderCancelledEvent, OrderStatus, Subjects} from '@tcticketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName} from './queue-group-name';
import { Order } from '../../models/order';


export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg:Message){
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1
    });

    // if no order, throw error
    if (!order){
      throw new Error('Order not found');
    }
    // mark the ticket as not being reserve
    order.set({status: OrderStatus.Cancelled});

    await order.save();
    
    msg.ack();
  }
}