const createError = require("http-errors");
const sinon = require('sinon');
const { expect } = require('chai');
// const chai = require("chai");
// const expect = chai.expect;

const controller = require("../../api/estates/controllers");
const services = require('../../api/estates/services');

describe('Estate controller tests:', () => {
  beforeEach(async () => {
  });

  afterEach(async () => {
    sinon.restore();
  });

  describe('get-all-estates', () => {
    it('should return all Estates', async () => {
      let req = {};
      let res = { status: sinon.spy(), json: sinon.spy() };
      let next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(services, 'fetchAllEstates').returns(Promise.resolve(
        [{ articleid: 22, name: 'House', createdon: '2019-02-11' }],
      ));

      await controller.getAllEstates(req, res, next);

      // assertions for succesful response
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'data');
    });

    it('should send appropriate response for empty query result', async () => {
      let req = {};
      let res = { status: sinon.spy(), json: sinon.spy() };
      let next = sinon.spy();

      sinon.stub(services, 'fetchAllEstates').returns(Promise.resolve([]));

      await controller.getAllEstates(req, res, next);

      // assertions for empty response
      expect(next.calledOnce).to.equal(true);
      expect(next.args[0][0].status).to.equal(404);
      expect(next.args[0][0].message).to.equal('Estates not found');
    });

    it('should handle server error', async () => {
      let req = {};
      let res = { status: sinon.spy(), json: sinon.spy() };
      let next = sinon.spy();

      sinon.stub(services, 'fetchAllEstates').returns(Promise.reject());
      // sinon.stub(services, 'fetchAllEstates').rejects( new Error('errr'));

      await controller.getAllEstates(req, res, next);

      // assertions for server error
      expect(next.calledOnce).to.equal(true);
    });
  });
});
