let sinon = require('sinon');
let { expect } = require('chai');
// let chai = require("chai");
// let expect = chai.expect;

let controller = require("../../api/estates/controllers");
let services = require('../../api/estates/services');

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
      sinon.stub(services, 'selectAllEstates').returns(Promise.resolve(
        [{ articleid: 22, name: 'House', createdon: '2019-02-11' }],
      ));

      await controller.getAllEstates(req, res, next);

      // assertions for successful response
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'data');
    });

    it('should send appropriate response for empty query result', async () => {
      let req = {};
      let res = { status: sinon.spy(), json: sinon.spy() };
      let next = sinon.spy();

      sinon.stub(services, 'selectAllEstates').returns(Promise.resolve([]));

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

      sinon.stub(services, 'selectAllEstates').returns(Promise.reject());
      // sinon.stub(services, 'selectAllEstates').rejects( new Error('errr'));

      await controller.getAllEstates(req, res, next);

      // assertions for server error
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('create-estate', () => {
    it('should create an Estate', async () => {
      let req = {};
      let res = { status: sinon.spy(), json: sinon.spy() };
      let next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(services, 'createEstate').returns(Promise.resolve(
        [{ estateID: 3, name: 'Harmony Court'}],
      ));

      await controller.postEstate(req, res, next);

      // assertions for successful response
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'data');
    });

    it('should handle server error', async () => {
      let req = {};
      let res = { status: sinon.spy(), json: sinon.spy() };
      let next = sinon.spy();

      sinon.stub(services, 'createEstate').returns(Promise.reject());

      await controller.postEstate(req, res, next);

      // assertions for server error
      expect(next.calledOnce).to.equal(true);
    });
  });
});
