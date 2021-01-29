import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async(done) =>{
  //create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concierto',
    price: 300,
    userId: '1234'
  });
  //save the ticket to the database
  await ticket.save();
  //fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  //make two separate changes to the ticket we fetch
  firstInstance!.set({ price: 10});
  secondInstance!.set({price:15});
  // save the first fetched ticket
  await firstInstance!.save();
  // save the second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch(Err){
    return done();
  }
  
});

it('increments the verison number on multiple saves', async()=>{
  const ticket = Ticket.build({
    title: 'concierto',
    price: 300,
    userId: '1234'
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});