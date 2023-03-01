import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('endpoint /teams', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves([{
        id: 1,
        teamName: "Avaí/Kindermann",
      }] as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('/teams - retornar todos os times corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get("/teams")

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.length).to.be.equal(1);
    expect(chaiHttpResponse.body[0].teamName).to.be.equal("Avaí/Kindermann");
    });
});

describe('endpoint /teams:id', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves({
        id: 1,
        teamName: "Avaí/Kindermann",
      } as Team);
  });

  after(()=>{
    (Team.findOne as sinon.SinonStub).restore();
  })

  it('/teams:id - retornar o time corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get("/teams/1")

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.id).to.be.equal(1);
    expect(chaiHttpResponse.body.teamName).to.be.equal("Avaí/Kindermann");
    });
});
