import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel'

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

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.exist;
    expect(chaiHttpResponse.body.role).to.exist;
  });

  it('que não é possível sem token', async () => {
    let chaiHttpResponse: Response;

    chaiHttpResponse = await chai
    .request(app)
    .get('/login/role')

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found')
  });

  // it('que não é possível com token invalido', async () => {
  //   let chaiHttpResponse: Response;

  //   const jwtPayload = 'teste'
  //   const jwtVerifyStub = sinon.stub(jwt, 'verify');
  //   jwtVerifyStub.returns(jwtPayload);
  
  //   after(()=>{
  //     (jwt.verify as sinon.SinonStub).restore();
  //   })

  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY3Nzc4NTI3MiwiZXhwIjoxNjc4MzkwMDcyfQ.FB4rst1QZufAAflnvxtDZSyISVO1Dgg3-WXHYFbW'

  //   chaiHttpResponse = await chai
  //   .request(app)
  //   .get('/login/role')
  //   .set('Authorization', token)

  //   expect(chaiHttpResponse.status).to.be.equal(401);
  //   expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token')
  // });
  
  it('que não é possível com token invalido', async () => {
    let chaiHttpResponse: Response;
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY3Nzc4NTI3MiwiZXhwIjoxNjc4MzkwMDcyfQ.FB4rst1QZufAAflnvxtDZSyISVO1Dgg3-WXHYFbW'
    
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/role')
    .set('Authorization', token)
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token')
  });

  it('que não é possível com token invalido', async () => {
    let chaiHttpResponse: Response;
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

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

    sinon
    .stub(User, "findOne")
    .resolves(undefined);

    chaiHttpResponse = await chai
    .request(app)
    .get('/login/role')
    .set('Authorization', token)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token')
  });
})
})