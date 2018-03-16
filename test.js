const expect = require('chai').expect
const request = require('supertest')
const nodesModule = require('./index')
const redis = require('redis')

const { it, describe, after, before } = require('mocha')

describe('Testing server...', () => {
  var endpoint = 'http://localhost:12345'

  before((done) => {
    let client = redis.createClient()
    client.FLUSHDB((err, reply) => {
      if (err) throw err
      nodesModule.start()
      client.quit()
      done()
    })
  })

  after((done) => {
    nodesModule.close()
    done()
  })

  it('Should add an element', (done) => {
    var note = {
      data: 'A note'
    }

    request(endpoint)
      .post('/notes')
      .send(note)
      .end((err, res) => {
        if (err) throw err
        expect(res.status).equal(200)
        expect(res.text).equal('0')
        done()
      })
  })

  it('Should list all elements', (done) => {
    var expected = '[{"notes:0":"A note"}]'
    // The first note created
    request(endpoint)
      .get('/notes')
      .send()
      .end((err, res) => {
        if (err) throw err
        expect(res.status).equal(200)
        expect(res.text).equal(expected)
        done()
      })
  })

  it('Should get one element', (done) => {
    var expected = '{"notes:0":"A note"}'
    // The first note created
    request(endpoint)
      .get('/notes/0')
      .send()
      .end((err, res) => {
        if (err) throw err
        expect(res.status).equal(200)
        expect(res.text).equal(expected)
        done()
      })
  })

  it('Should get an invalid element', (done) => {
    var expected = '{"error":"expect integer, got NaN"}'
    request(endpoint)
      .get('/notes/invalid')
      .send()
      .end((err, res) => {
        if (err) throw err
        expect(res.text).equal(expected)
        done()
      })
  })
})
