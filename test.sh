#!/bin/sh

PORT=12345

for item in 0 1 2 3 4 5 6 7
do
    curl -d "{\"data\":\"Note $item\"}" -H "Content-Type: application/json" -X POST http://localhost:12345/notes
    echo
done

curl -X GET http://localhost:${PORT}/notes
echo

curl -X GET http://localhost:${PORT}/notes/1
echo

curl -X GET http://localhost:${PORT}/notes/azer
echo

curl -X DELETE http://localhost:${PORT}/notes/0
echo

curl -X GET http://localhost:${PORT}/notes/0
echo
