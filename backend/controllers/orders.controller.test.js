const assert = require('assert');
const sinon = require('sinon');
const db = require('../config/db.config');
const {
    CreateOrder,
    GetOrders,
    GetAdminOrders,
    GetOrderDetails,
    EditOrders
} = require('./orders.controller');

describe('Order functions', function() {

    describe('CreateOrder', function() {
        it('should call db.query with the correct arguments', function() {
            const req = {
                body: {
                    CartCount: 5,
                    Price: 10.0,
                    storeID: 1,
                    customerID: 2,
                    sessionID: 'abc123'
                }
            };
            const queryStub = sinon.stub(db, 'query');
            CreateOrder(req, {}, function() {});
            assert(queryStub.calledOnceWith(`CALL CreateOrder(5, 10, 1, 2, 'abc123');`));
            queryStub.restore();
        });
    });

    describe('GetOrders', function() {
        it('should call db.query with the correct arguments', function() {
            const req = {
                query: {
                    customerID: 2
                }
            };
            const queryStub = sinon.stub(db, 'query');
            GetOrders(req, {}, function() {});
            assert(queryStub.calledOnceWith(`CALL GetOrders(2);`));
            queryStub.restore();
        });
    });

    describe('GetAdminOrders', function() {
        it('should call db.query with the correct arguments', function() {
            const req = {
                query: {
                    storeID: 1
                }
            };
            const queryStub = sinon.stub(db, 'query');
            GetAdminOrders(req, {}, function() {});
            assert(queryStub.calledOnceWith(`CALL GetAdminOrders(1);`));
            queryStub.restore();
        });
    });

    describe('GetOrderDetails', function() {
        it('should call db.query with the correct arguments', function() {
            const req = {
                query: {
                    orderID: 3
                }
            };
            const queryStub = sinon.stub(db, 'query');
            GetOrderDetails(req, {}, function() {});
            assert(queryStub.calledOnceWith(`CALL GetOrderDetails(3);`));
            queryStub.restore();
        });
    });

    describe('EditOrders', function() {
        it('should call db.query with the correct arguments', function() {
            const req = {
                body: {
                    orderID: 3,
                    orderStatus: 'shipped',
                    deliveryDate: '2022-01-01'
                }
            };
            const queryStub = sinon.stub(db, 'query');
            EditOrders(req, {}, function() {});
            assert(queryStub.calledOnceWith(`CALL EditOrders(3, 'shipped', '2022-01-01');`));
            queryStub.restore();
        });
    });

});
