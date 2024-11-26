import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../App.js';
import mongoose from 'mongoose';
import { User } from '../models/user.models.js';
import { List } from '../models/list.model.js';
import connectDB from '../db/index.js';
import dotenv from "dotenv"


chai.use(chaiHttp);
const expect = chai.expect;
dotenv.config({
  path: './.env'
})

describe('User API Endpoints', () => {
  before(async () => {
    // Connect to the database
    connectDB()
    // Clear users and todos before each test
    await User.deleteMany({});
    await List.deleteMany({});
  });

  let userToken = '';

  describe('POST /users/register', () => {
    it('new user', (done) => {
      chai.request(app)
        .post('/users/register')
        .send({ username: 'testuser', password: 'testpassword' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('user registeres successfully');
          done();
        });
    });
  });

  describe('POST /users/login', () => {
    it('login user', (done) => {
      chai.request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpassword' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('User logged in successfully');
          userToken = res.body.data.accessToken; // Save token for later use
          done();
        });
    });
  });

  describe('POST /users/add-todo', () => {
    it('add todo', (done) => {
      chai.request(app)
        .post('add-todo')
        .set('Authorization', `Bearer ${userToken}`)
        .field('todo', 'Test Todo')
        .field('description', 'This is a test todo')
        .field('status', 'pending')
        .field('date', '2024-07-20')
        .attach('workImage', Buffer.from(''), 'testimage.png')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('todo created successfully');
          done();
        });
    });
  });

  describe('GET /users/todos', () => {
    it('show alltodos', (done) => {
      chai.request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('cart shown successfully');
          expect(res.body.data.works).to.be.an('array');
          done();
        });
    });
  });

 
});
