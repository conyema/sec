const fs = require('fs');
const sinon = require('sinon');
const { expect } = require('chai');
// const chai = require("chai");
// const expect = chai.expect;

const controller = require('../../api/estates/controller');
const service = require('../../api/estates/service');

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
      sinon.stub(service, 'selectAllEstates').returns(Promise.resolve());

      await controller.getAllEstates(req, res, next);

      // assertions
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message', 'data');
    });

    // it('should send appropriate response for empty query result', async () => {
    //   const req = {};
    //   const res = { status: sinon.spy(), json: sinon.spy() };
    //   const next = sinon.spy();

    //   sinon.stub(service, 'selectAllEstates').returns(Promise.resolve({
    //     rows: [],
    //   }));

    //   await controller.getAllEstates(req, res, next);

    //   // assertions
    //   expect(next.calledOnce).to.equal(true);
    //   expect(next.args[0][0].status).to.equal(404);
    //   expect(next.args[0][0].message).to.equal('No estate available yet');
    // });

    it('should handle server error', async () => {
      const req = {};
      const res = { status: sinon.spy(), json: sinon.spy() };
      const next = sinon.spy();

      sinon.stub(service, 'selectAllEstates').returns(Promise.reject());
      // sinon.stub(service, 'selectAllEstates').rejects( new Error('errr'));

      await controller.getAllEstates(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('POST /estates', () => {
    it('should create an Estate', async () => {
      const req = { body: {} };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(service, 'createEstate').returns(Promise.resolve());

      await controller.postEstate(req, res, next);

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

      sinon.stub(service, 'createEstate').returns(Promise.reject());

      await controller.postEstate(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('PUT /estates/:id', () => {
    it('should update an Estate', async () => {
      const req = {
        params: { id: '3' },
        body: {},
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(service, 'updateEstate').returns(Promise.resolve());

      await controller.editEstate(req, res, next);

      // assertions
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message', 'data');
    });

    it('should handle server error', async () => {
      const req = {
        params: { id: '3' },
        body: {},
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(service, 'updateEstate').returns(Promise.reject());

      await controller.editEstate(req, res, next);

      // assertions
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
      sinon.stub(service, 'deleteEstate').returns(Promise.resolve({
        rowCount: 1,
      }));

      await controller.deleteEstate(req, res, next);

      // assertions
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message');
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

      sinon.stub(service, 'deleteEstate').returns(Promise.reject());

      await controller.deleteEstate(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('GET /estates/:id', () => {
    it('should fetch an Estate', async () => {
      const req = {
        estate: { id: '3' }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      // sinon.stub(service, 'selectOneEstate').returns(Promise.resolve());

      await controller.getOneEstate(req, res, next);

      // assertions
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message', 'data');
    });

    it('should handle server error', async () => {
      const req = {
        estate: { id: '3' }
      };
      // const res = {
      //   status: sinon.spy(),
      //   json: sinon.spy()
      // };
      const res = {
        status: sinon.spy(),
        // I want to stub the json response to fake a server error
        json: {}
      };
      const next = sinon.spy();

      // Induced server error
      // sinon.stub(service, 'selectOneEstate').returns(Promise.reject());
      let error = new Error("fake server error");
      sinon.stub(res, "json").throws(error);

      await controller.getOneEstate(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('POST /estates/:id/images', () => {
    it('should upload image of an existing Estate', async () => {
      const req = {
        params: { id: '3' },
        files: {
          image: {
            size: 1,
            filepath: '/uploads',
            mimetype: 'image/png',
          }
        },
        body: {
          title: "thumbnail"
        }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();
      const fsSpy = sinon.spy(fs, 'unlink');
      // create a stub to fake the database query service response
      sinon.stub(service, 'postImage').returns(Promise.resolve());

      await controller.postImage(req, res, next);

      // assertions
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message', 'data');
      // expect(fsSpy.calledOnce).to.equal(true);
    });

    it('should not upload an empty image file', async () => {
      const req = {
        params: { id: '3' },
        files: {
          image: {
            // size: 1,
            filepath: '/uploads',
            mimetype: 'image/png',
          }
        },
        body: {
          title: "thumbnail"
        }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();
      const fsSpy = sinon.spy(fs, 'unlink');

      sinon.stub(service, 'postImage').returns(Promise.resolve());

      await controller.postImage(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
      expect(next.args[0][0].status).to.equal(400);
      expect(next.args[0][0].message).to.equal('Please upload an image');
      // expect(fsSpy.calledOnce).to.equal(true);
    });

    it('should handle server error', async () => {
      const req = {
        params: { id: '3' },
        files: {
          image: {
            size: 1,
            filepath: '/uploads',
            mimetype: 'image/png',
          }
        },
        body: {
          title: "thumbnail"
        }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();
      const fsSpy = sinon.spy(fs, 'unlink');

      sinon.stub(service, 'postImage').returns(Promise.reject());

      await controller.postImage(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
      // expect(fsSpy.calledOnce).to.equal(true);
    });
  });

  describe('DELETE /estates/:id/images/:imgId', () => {
    it('should delete image of an existing estate ', async () => {
      const req = {
        params: { id: '3' },
        // estate: { tag: 'imageKey' }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(service, 'deleteImage').returns(Promise.resolve());

      await controller.deleteImage(req, res, next);

      // assertions
      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message');
    });

    it('should handle server error', async () => {
      const req = {
        params: { id: '3' },
        query: { tag: 'imageKey' }
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      sinon.stub(service, 'deleteImage').returns(Promise.reject());

      await controller.deleteImage(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
    });
  });

  describe('USE /estates/:id', () => {
    it('should return next handler if matching id exists', async () => {
      const req = {
        params: { id: '3' },
      };
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      };
      const next = sinon.spy();

      // create a stub to fake the database query service response
      sinon.stub(service, 'selectOneEstate').returns(Promise.resolve({
        id: 3,
        title: 'something',
      }));

      await controller.verifyEstate(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
    });

    it('should send appropriate response if no matching id exists', async () => {
      const req = {
        params: { id: '30' },
      };
      const res = { status: sinon.spy(), json: sinon.spy() };
      const next = sinon.spy();

      sinon.stub(service, 'selectOneEstate').returns(Promise.resolve());

      await controller.verifyEstate(req, res, next);

      // assertions
      // expect(next.calledOnce).to.equal(true);
      // expect(next.args[0][0].status).to.equal(404);
      // expect(next.args[0][0].message).to.equal('Estate does not exist');

      expect(res.status.calledOnce).to.equal(true);
      expect(res.json.calledOnce).to.equal(true);
      expect(res.status.args[0][0]).to.equal(404);
      expect(res.json.args[0][0]).to.be.an('object').that.has.all.keys('status', 'message');
      expect(res.json.args[0][0].message).to.equal('Estate does not exist');
    });

    it('should handle server error', async () => {
      const req = {
        params: { id: '3' },
      };
      const res = { status: sinon.spy(), json: sinon.spy() };
      const next = sinon.spy();

      sinon.stub(service, 'selectOneEstate').returns(Promise.reject());

      await controller.verifyEstate(req, res, next);

      // assertions
      expect(next.calledOnce).to.equal(true);
    });
  });
});
