// const assert = require('chai').assert;
// const request = require('supertest');

// const {app} = require('./index');



// describe('login', function() {
//     it('Megfelelő adatok estén kiosztja a tokent és a bejelentkezés sikeres', function(done) {
//       request(app)
//         post('localhost:8080/login/')
//         .send({ nev: 'test', jelszo: 'password' })
//         .end(function(err, res) {
//           assert.equal(res.status, 200);
//           assert.isString(res.body.token);
//           done();
//         });
//     });
  
//     it('Error-t dob vissza ha a bejelentkezés sikertelen', function(done) {
//       request(app)
//         .post('localhost:8080/login/')
//         .send({ nev: 'test', jelszo: 'wrongpassword' })
//         .end(function(err, res) {
//           assert.equal(res.status, 401);
//           assert.equal(res.body.message, 'Sikertelen bejelentkezés');
//           done();
//         });
//     });
  
//     it('Error-t dob vissza ha hiányoznak adatok', function(done) {
//       request(app)
//         .post('localhost:8080/login/')
//         .end(function(err, res) {
//           assert.equal(res.status, 400);
//           assert.equal(res.body.message, 'hibás adatok');
//           done();
//         });
//     });
//   });

