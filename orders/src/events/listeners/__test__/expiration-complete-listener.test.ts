import { OrderStatus, ExpirationCompleteEvent } from '@tcticketing/common';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';
import { ExpirationCompleteListener} from '../expiration-complete-listener';
import { Order } from '../../../models/order';

const setup = async() =>{
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();
  const order = Order.build({
    userId: 'ñlakdsj',
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, ticket, order, msg, data};
  
};

it('updates the order status to cancelled', async()=>{
  const { listener, ticket, order, msg, data} = await setup();
  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(data.orderId);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);

});

it('emit an order cancelled event', async()=>{
  const { listener, order, msg, data} = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(eventData.id).toEqual(order.id);
});

it('ack the messages', async()=>{
  const { listener, msg, data} = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});