import nats from 'node-nats-streaming';
import { title } from 'process';
import { Subjects } from './events/subjects';
import { TicketCreatedListener } from './events/ticket-created-listener';
import { TicketCreatedPublisher } from './events/ticket-creater-publish';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://127.0.0.1:4222',
});

stan.on('connect', async () => {
  console.log ('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id:'123',
      title: 'concert',
      price: 20
  
    });
  } catch (err){
    console.log(err);
  }
  
  

});

