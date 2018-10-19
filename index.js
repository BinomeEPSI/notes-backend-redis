const express = require('express')
const app = express()
let redis = require('redis')
let client = redis.createClient()
let bluebird = require('bluebird')
let bodyParser = require('body-parser')
let async = require('async')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

app.post('/notes', bodyParser.text(), (req, res) => {
  var data = req.body
  client.getAsync('count').then((resultat) => {
    var noteId = resultat
    var note = `notes:${noteId}`
    var jsonObject = { data: data }
    client.multi().set(note, JSON.stringify(jsonObject)).incr('count').execAsync().then((result) => {
      res.send(noteId)
    })
  })
})

app.post('/notes-details', bodyParser.json(), (req, res) => {
  var data = req.body.data
  var author = req.body.author

  client.getAsync('count').then((resultat) => {
    var noteId = resultat
    var note = `notes:${noteId}`
    var jsonObject = { data: data, author: author }
    client.multi().set(note, JSON.stringify(jsonObject)).incr('count').execAsync().then((result) => {
      res.send(noteId)
    })
  })
})

app.get('/notes', (req, res) => {
  client.getAsync('count').then((count) => {
    let notes = []
    for (let i = 0; i < count; i++) {
      var note = 'notes:' + i
      notes.push(note)
    }

    let notesData = []
    async.each(notes, (item, callback) => {
      client.getAsync(item).then((noteData) => {
        var obj = {}
        obj[item] = JSON.parse(noteData)
        notesData.push(obj)
      }).then(() => {
        callback()
      })
    }, (err) => {
      if (err) throw err
      res.send(notesData)
    })
  })
})

app.get('/notes/:id', (req, res) => {
  var id = parseInt(req.params.id)
  if (!Number.isInteger(id)) {
    res.send({ 'error': 'expect integer, got ' + id })
    return
  }

  client.getAsync('notes:' + id).then((noteData) => {
    var obj = {}
    obj[`notes:${id}`] = JSON.parse(noteData)
    res.send(obj)
  })
})

app.delete('/notes/:id', (req, res) => {
  var id = parseInt(req.params.id)
  if (!Number.isInteger(id)) {
    res.status(400).send({ 'error': 'expect integer, got ' + id })
    return
  }

  client.delAsync(`notes:${id}`).then((data) => {
    res.send('OK')
  })
})

client.on('error', (err) => {
  console.log('Error')
  console.log(err)
})

let server
let start = () => {
  server = app.listen(process.env.PORT, () => {
    console.log(`'Note' listening on port ${process.env.PORT} !`)
    client.setAsync('count', 0).then(() => {
      console.log('Counter initialized')
    })
  })
}

let stop = () => {
  server.close()
  client.quit()
}

if (require.main === module) {
  start()
}

module.exports.start = start
module.exports.close = stop
