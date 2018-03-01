const express = require('express');
const app = express();
let redis = require("redis");
let client = redis.createClient();
let bluebird = require("bluebird");
let bodyParser = require("body-parser");
let async = require("async");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.setAsync("count", 0).then(() => {
    console.log("Counter initialized");
});

client.on("error", () => {
    console.log("Error");
    console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/notes', (req, res) => {
    console.log(req.body.data);
    var data = req.body.data;
    client.getAsync("count").then((resultat) => {
        var noteId = resultat;
        var note = "notes:" + noteId;
        client.multi().set(note, data).incr("count").execAsync().then((result) => {
            res.send(noteId);
        });
    });
});

app.get("/notes", (req, res) => {
    client.getAsync("count").then((count) => {
        notes = [];
        for (i = 0; i < count; i++) {
            var note = "notes:" + i;
            notes.push(note);
        }

        notes_data = [];
        console.log(notes);
        async.each(notes, (item, callback) => {
            console.log(item);
            client.getAsync(item).then((note_data) => {
                console.log(note_data);
                notes_data.push({ note: note_data });
            }).then(() => {
                return;
            });
        }, (err) => {
            res.send(JSON.stringify(notes_data));
        });
    });

});


app.listen(1234, () => {
    console.log('Example app listening on port 3000!')
});
