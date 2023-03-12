import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import Match from '../database/models/MatchModel'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
describe('endpoint /matches', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves([
        {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
      }] as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('retorna todos as partidas corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get("/matches")

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.length).to.be.equal(1);
    expect(chaiHttpResponse.body[0].homeTeamId).to.be.equal(16);
    });
});

describe('endpoint /matches?inProgress=true', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves([
        {
            "id": 41,
            "homeTeamId": 16,
            "homeTeamGoals": 2,
            "awayTeamId": 9,
            "awayTeamGoals": 0,
            "inProgress": true,
          }] as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('retorna somente as partidas em andamento', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get("/matches?inProgress=true")

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.length).to.be.equal(1);
    expect(chaiHttpResponse.body[0].id).to.be.equal(41);
    });
});
describe('endpoint /matches?inProgress=false', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves([
        {
            "id": 1,
            "homeTeamId": 16,
            "homeTeamGoals": 1,
            "awayTeamId": 8,
            "awayTeamGoals": 1,
            "inProgress": false,
          }] as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('retorna somente as partidas finalizadas', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get("/matches?inProgress=false")

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.length).to.be.equal(1);
    expect(chaiHttpResponse.body[0].id).to.be.equal(1);
    });
});

// describe('endpoint /matches/:id/finish', () => {
//     it('com token valido, retorna a mensagem "finish" se att com sucesso o status da partida', async () => {

//   let chaiHttpResponse: Response;
  
//   before(async () => {
//     sinon
//       .stub(jwt, "verify")
//       .resolves({ data: { email: 'admin@admin.com' }} as any)
//     sinon
//       .stub(Match, "update")
//       .resolves([1] as [number]);
//   });

//   after(()=>{
//     (jwt.verify as sinon.SinonStub).restore();
//     (Match.update as sinon.SinonStub).restore();
//   })

  
//     // const user = {
//     //     "email": "admin@admin.com",
//     //     "password": "secret_admin"
//     // }

//     // chaiHttpResponse = await chai
//     //    .request(app)
//     //    .post('/login')
//     //    .send(user)

//     // expect(chaiHttpResponse.status).to.be.equal(200);
//     // expect(chaiHttpResponse.body).to.exist;
//     // expect(chaiHttpResponse.body.token).to.exist;

//     const token = 'mocktoken'


//     chaiHttpResponse = await chai
//        .request(app)
//        .patch('/matches/41/finish')
//        .set('Authorization', token)

  
//     expect(chaiHttpResponse.status).to.be.equal(200);
//     expect(chaiHttpResponse.body.message).to.be.equal('Finished');
//   });

// //   it('/teams:id - retorn erro caso id inexistente', async () => {

// //     (Team.findOne as sinon.SinonStub).restore();
// //     sinon
// //       .stub(Team, "findOne")
// //       .resolves(undefined);

// //     chaiHttpResponse = await chai
// //        .request(app)
// //        .get("/teams/2")
  
// //     expect(chaiHttpResponse.status).to.be.equal(404);

// //   });
// });
});
