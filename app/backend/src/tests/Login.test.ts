import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
describe('endpoint /login', () => {
  it('será validado se é possível fazer o login com dados corretos', async () => {
    let chaiHttpResponse: Response;

    const user = {
        "email": "admin@admin.com",
        "password": "secret_admin"
      }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(user)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.exist;
    expect(chaiHttpResponse.body.token).to.exist;
  });

  it('será validado que se tentar fazer o login sem e-mail retornará status não-autorizado', async () => {
    let chaiHttpResponse: Response;

    const user = {
        "password": "secret_admin",
      }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(user)

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.exist;
    expect(chaiHttpResponse.body.message).to.be.equal("All fields must be filled");
  });

  it('será validado que se tentar fazer o login sem senha retornará status não-autorizado', async () => {
    let chaiHttpResponse: Response;

    const user = {
        "email": "admin@admin.com",
      }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(user)

       expect(chaiHttpResponse.status).to.be.equal(400);
       expect(chaiHttpResponse.body).to.exist;
       expect(chaiHttpResponse.body.message).to.be.equal("All fields must be filled");
  });

  it('será validado que se fazer o login com um email incorreto retornará status não-autorizado', async () => {
    let chaiHttpResponse: Response;

    const user = {
        "email": "admin",
        "password": "secret_admin"
      }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(user)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.exist;
    expect(chaiHttpResponse.body.message).to.be.equal("Invalid email or password");
});

  it('será validado que se tentar fazer o login com um e-mail inválido retornará status não-autorizado', async () => {
    let chaiHttpResponse: Response;

    const user = {
        "email": "teste@admin.com",
        "password": "secret_admin"
      }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(user)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.exist;
    expect(chaiHttpResponse.body.message).to.be.equal("Invalid email or password");
  });

  it('será validado que se fazer o login com uma senha incorreta retornará status não-autorizado', async () => {
    let chaiHttpResponse: Response;

    const user = {
        "email": "admin@admin.com",
        "password": "testeteste"
      }

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(user)

   expect(chaiHttpResponse.status).to.be.equal(401);
   expect(chaiHttpResponse.body).to.exist;
   expect(chaiHttpResponse.body.message).to.be.equal("Invalid email or password");
  });

  it('tentar fazer o login com uma senha inválida retornará status não-autorizado', async () => {
    let chaiHttpResponse: Response;

    const user = {
        "email": "admin@admin.com",
        "password": "ok"
      }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(user)

       expect(chaiHttpResponse.status).to.be.equal(401);
       expect(chaiHttpResponse.body).to.exist;
       expect(chaiHttpResponse.body.message).to.be.equal("Invalid email or password");
  });

});

describe('endpoint /login/role', () => {
  it('será validado que é possível buscar a role com dados corretos', async () => {
    let chaiHttpResponse: Response;

    const user = {
        "email": "admin@admin.com",
        "password": "secret_admin"
      }

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(user)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.exist;
    expect(chaiHttpResponse.body.token).to.exist;

    const token = chaiHttpResponse.body.token

    chaiHttpResponse = await chai
    .request(app)
    .get('/login/role')
    .set('Authorization', token)

    // expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.exist;
    // expect(chaiHttpResponse.body.role).to.exist;
  });
})
})