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

  describe('GET /estates', () => {
    it('should return all Estates', async () => {
      const req = {};
      const res = { status: sinon.spy(), json: sinon.spy() };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(services, 'selectAllEstates').returns(Promise.resolve({
        rows: [{ estateId: 22, name: 'House', description: 'A two-bed room flat' }],
      }));

      await controller.getAllEstates(req, res, next);

      // assertions for successful response
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'data');
    });

    it('should send appropriate response for empty query result', async () => {
      const req = {};
      const res = { status: sinon.spy(), json: sinon.spy() };
      const next = sinon.spy();

      sinon.stub(services, 'selectAllEstates').returns(Promise.resolve({
        rows: [],
      }));

      await controller.getAllEstates(req, res, next);

      // assertions for empty response
      expect(next.calledOnce).to.equal(true);
      expect(next.args[0][0].status).to.equal(404);
      expect(next.args[0][0].message).to.equal('No estate available yet');
    });

    it('should handle server error', async () => {
      const req = {};
      const res = { status: sinon.spy(), json: sinon.spy() };
      const next = sinon.spy();

      sinon.stub(services, 'selectAllEstates').returns(Promise.reject());
      // sinon.stub(services, 'selectAllEstates').rejects( new Error('errr'));

      await controller.getAllEstates(req, res, next);

      // assertions for server error
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('POST /estates', () => {
    it('should create an Estate', async () => {
      const req = { fields: {} };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(services, 'createEstate').returns(Promise.resolve(
        [{ estateID: 3, name: 'Harmony Court'}],
      ));

      await controller.postEstate(req, res, next);

      // assertions for successful creation
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(201);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'data');
    });

    it('should handle server error', async () => {
      const req = { fields: {} };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'createEstate').returns(Promise.reject());

      await controller.postEstate(req, res, next);

      // assertions for server error
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('PATCH /estates/:id', () => {
    it('should update an Estate', async () => {
      const req = {
        params: { id: '3' },
        fields: {},
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(services, 'updateEstate').returns(Promise.resolve(
        [{ estateId: 3, name: 'Harmony Court'}],
      ));

      await controller.editEstate(req, res, next);

      // assertions for successful creation
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'data');
    });

    it('should not update a non-existent estate', async () => {
      const req = {
        params: { id: '122' },
        fields: {},
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'updateEstate').returns(Promise.resolve({
        rowCount: 0
      }));

      await controller.editEstate(req, res, next);

      // assertions for empty response
      expect(next.calledOnce).to.equal(true);
      expect(next.args[0][0].status).to.equal(404);
      expect(next.args[0][0].message).to.equal('Estate does not exist');
    });

    it('should handle server error', async () => {
      const req = {
        params: { id: '3' },
        fields: {},
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'updateEstate').returns(Promise.reject());

      await controller.editEstate(req, res, next);

      // assertions for server error
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('DELETE /estates/:id', () => {
    it('should delete an Estate', async () => {
      const req = {
        params: { id: '3' }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(services, 'deleteEstate').returns(Promise.resolve({
        rowCount: 1,
      }));

      await controller.deleteEstate(req, res, next);

      // assertions for successful creation
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message');
    });

    it('should not delete a non-existent estate', async () => {
      const req = {
        params: { id: '122' },
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'deleteEstate').returns(Promise.resolve({
        rowCount: 0,
      }));

      await controller.deleteEstate(req, res, next);

      // assertions for empty response
      expect(next.calledOnce).to.equal(true);
      expect(next.args[0][0].status).to.equal(404);
      expect(next.args[0][0].message).to.equal('Estate does not exist');
    });

    it('should handle server error', async () => {
      const req = {
        params: { id: '3' },
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'deleteEstate').returns(Promise.reject());

      await controller.deleteEstate(req, res, next);

      // assertions for server error
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('GET /estates/:id', () => {
    it('should fetch an Estate', async () => {
      const req = {
        params: { id: '3' }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(services, 'selectOneEstate').returns(Promise.resolve({
        rowCount: 1,
        rows: [{ estateId: 3, name: 'House', description: 'A two-bed room apartment' }],
      }));

      await controller.getOneEstate(req, res, next);

      // assertions for successful creation
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'data');
    });

    it('should handle query for a non-existent estate', async () => {
      const req = {
        params: { id: '122' },
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'selectOneEstate').returns(Promise.resolve({
        rowCount: 0,
        rows: [],
      }));

      await controller.getOneEstate(req, res, next);

      // assertions for empty response
      expect(next.calledOnce).to.equal(true);
      expect(next.args[0][0].status).to.equal(404);
      expect(next.args[0][0].message).to.equal('Estate does not exist');
    });

    it('should handle server error', async () => {
      const req = {
        params: { id: '3' },
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'selectOneEstate').returns(Promise.reject());

      await controller.getOneEstate(req, res, next);

      // assertions for server error
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('POST /estates/:id/files', () => {
    it('should upload file of an existing Estate', async () => {
      const req = {
        params: { id: '3' },
        files: {
          image: {
            size: 1
          }
        },
        fields: {
          tag: "thumbnail"
        }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(services, 'uploadFile').returns(Promise.resolve({
        rowCount: 1
      }));

      await controller.postFile(req, res, next);

      // assertions for successful creation
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message', 'data');
    });

    it('should not upload file for a non-existent estate', async () => {
      const req = {
        params: { id: '388' },
        files: {
          image: {
            size: 1
          }
        }
        ,
        fields: {
          tag: "thumbnail"
        }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'uploadFile').returns(Promise.resolve({
        rowCount: 0
      }));

      await controller.postFile(req, res, next);

      // assertions for empty response
      expect(next.calledOnce).to.equal(true);
      expect(next.args[0][0].status).to.equal(400);
      expect(next.args[0][0].message).to.equal('Estate does not exist');
    });

    it('should not upload an empty file', async () => {
      const req = {
        params: { id: '3' },
        files: {
          image: {
            size: 0
          }
        },
        fields: {
          tag: "thumbnail"
        }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'uploadFile').returns(Promise.resolve());

      await controller.postFile(req, res, next);

      // assertions for empty response
      expect(next.calledOnce).to.equal(true);
      expect(next.args[0][0].status).to.equal(400);
      expect(next.args[0][0].message).to.equal('You need to upload a file with an identifying tag');
    });

    it('should not upload file without an identifying tag', async () => {
      const req = {
        params: { id: '3' },
        files: {
          image: {
            size: 1
          }
        }
        ,
        fields: {
          tag: ""
        }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'uploadFile').returns(Promise.resolve());

      await controller.postFile(req, res, next);

      // assertions for empty response
      expect(next.calledOnce).to.equal(true);
      expect(next.args[0][0].status).to.equal(400);
      expect(next.args[0][0].message).to.equal('You need to upload a file with an identifying tag');
    });

    it('should handle server error', async () => {
      const req = {
        params: { id: '3' },
        files: {
          image: {
            size: 1
          }
        },
        fields: {
          tag: "thumbnail"
        }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(services, 'uploadFile').returns(Promise.reject());

      await controller.postFile(req, res, next);

      // assertions for server error
      expect(next.calledOnce).to.equal(true);
    });
  });
});
