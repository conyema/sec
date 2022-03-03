const sinon = require('sinon');
const { expect } = require('chai');

const controller = require('../../api/users/controller');
const service = require('../../api/users/service');

describe('User controller tests:', () => {
  beforeEach(async () => {
  });

  afterEach(async () => {
    sinon.restore();
  });

  describe('POST /users', () => {
    it('should create an user profile', async () => {
      const req = { body: {} };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(service, 'createUser').returns(Promise.resolve());

      await controller.postUser(req, res, next);

      // assertions
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(201);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message', 'data');
    });

    it('should handle server error', async () => {
      const req = { body: {} };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(service, 'createUser').returns(Promise.reject());

      await controller.postUser(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
    });
  });

});
