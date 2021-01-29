import request from 'supertest';
import { formatDiagnostic } from 'typescript';
import { app } from '../../app';

it('returns a 201 on successful signup', async () =>{

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234'
    })
    .expect(201);


});

it('returns a 400 with an invalid email', async() => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: '1234'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async() => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 with an invalid email and password', async() => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'p',
    })
    .expect(400);
});

it ('disallows duplicate emails', async() =>{
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234'
    })
    .expect(400);
});

it('sets a cookie after succesfull request', async () =>{
  
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});