#!/bin/sh

for item in 1 2 3 4 5
do
    curl -d "{\"data\":\"Note $item\"}" -H "Content-Type: application/json" -X POST http://localhost:1234/notes
    echo
done

curl -X GET http://localhost:1234/notes
