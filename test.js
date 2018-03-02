const should = require('chai').should;
const assert = require("chai").assert;
const expect = require("chai").expect;
const request = require("supertest");

describe("Testing server...", () => {
    var endpoint = 'http://localhost:12345';

    before((done) => {
        done();
    });

    it("Should add an element", (done) => {
        var note = {
            data: "A note"
        };

        request(endpoint)
            .post('/notes')
            .send(note)
            .end((err, res) => {
                if (err) throw err;
                expect(res.status).equal(200);
                expect(res.text).equal("0");
                done();
            });
    });

    it("Should list all elements", (done) => {
        expected = "[{\"notes:0\":\"A note\"}]";
        // The note previously created
        request(endpoint)
            .get("/notes")
            .send()
            .end((err, res) => {
                if (err) throw err;
                expect(res.status).equal(200);
                expect(res.text).equal(expected);
                done();
            });
    });

    it("Should get one element", (done) => {
        expected = "{\"notes:0\":\"A note\"}";
        // The first note created
        request(endpoint)
            .get("/notes/0")
            .send()
            .end((err, res) => {
                if (err) throw err;
                expect(res.status).equal(200);
                expect(res.text).equal(expected);
                done();
            });
    })
});