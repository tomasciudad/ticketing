import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import {OrderCancelledEvent, OrderStatus} from '@tcticketing/common';
import { natsWrapper } from '../../../nats-wrapper';
import { Order } from '../../../models/order';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
  //create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  //create and save a ticket
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: 'asdkl',
    status: OrderStatus.Created,
    price: 10
  });
  await order.save();

  
  const data: OrderCancelledEvent['data']={
    id: order.id,
    version: 1,
    ticket: {
      id: 'añlskdja',
    }

  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, order, data, msg };
};

it('updates the statuas of the order ', async()=>{
  const { listener, order, data, msg } = await setup();
  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);

});

it('acks the message', async()=>{
  const { listener,order, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});