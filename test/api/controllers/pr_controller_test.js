/**
 * Created by azhakesan on 7/1/2018.
 */
var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function () {

    describe('pr_controller', function () {
        describe('GET /prhawk/azhakesan/repo', function () {
            it('Success -200', function (done) {
                request(server)
                    .get('/prhawk/azhakesan/repo')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        res.statusCode.should.eql(200);
                        done();
                    });
            });
            it('Failure - 404', function (done) {
                request(server)
                    .get('/prhawk/azhakesan1/repo')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .end(function (err, res) {
                        should.not.exist(err);
                        res.statusCode.should.eql(404);
                        done();
                    });
            });
            it('Failure - Validation failure', function (done) {
                request(server)
                    .get('/prhawk/ /repo')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(404)
                    .end(function (err, res) {
                        res.statusCode.should.eql(404);
                        done();
                    });
            });
        });

    });

});