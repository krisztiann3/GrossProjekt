jest.mock('express',()=>{
    return {
        Router: jest.fn(()=>{
            return{
                get: jest.fn(),
                post: jest.fn()
            };
        })
    }
})


const request = require('supertest');
const app = require('./index');

test('returns 200 OK and success message for valid credentials', () => {
  const credentials = { username: 'valid_username', password: 'valid_password' };
  return request(app)
    .post('/login')
    .send(credentials)
    .expect(200)
    .expect('Logged in successfully!');
});

test('returns 401 Unauthorized for invalid credentials', () => {
  const credentials = { username: 'invalid_username', password: 'invalid_password' };
  return request(app)
    .post('/login')
    .send(credentials)
    .expect(401)
    .expect('Invalid credentials.');
});