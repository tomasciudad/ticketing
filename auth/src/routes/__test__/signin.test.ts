import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async()=>{
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '1234'
    })
    .expect(400);
});