#!/bin/sh

PORT=12345

for item in 0 1 2 3 4 5 6 7
do
    curl -d "Note $item" -H "Content-Type: text/plain" -X POST http://localhost:${PORT}/notes
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

curl -X POST -H "Content-Type: application/json" -d "{\"data\":\"Note $item\", \"author\":\"Sylvain\"}" http://localhost:${PORT}/notes-details
echo