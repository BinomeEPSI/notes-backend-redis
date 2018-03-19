#!/bin/sh

PORT=12345

for item in 0 1 2 3 4 5 6 7
do
    curl -d "Note $item" -H "Content-Type: text/plain" -X POST http://localhost:${PORT}/notes 1>/dev/null 2>/dev/null
    if test $? -ne 0; then 
        echo "Veuillez démarrer le serveur Express avant ce script."
        exit 1
    fi
done

echo "Get all notes"
curl -X GET http://localhost:${PORT}/notes
echo

echo "Get one note"
curl -X GET http://localhost:${PORT}/notes/1
echo

echo "Get an invalid note"
curl -X GET http://localhost:${PORT}/notes/azer
echo

echo "Delete one note"
curl -X DELETE http://localhost:${PORT}/notes/0
echo

echo "Attest the deleted note is gone"
curl -X GET http://localhost:${PORT}/notes/0
echo

echo "Add a note with an author"
id=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"data\":\"Note $item\", \"author\":\"Sylvain\"}" http://localhost:${PORT}/notes-details)
curl -X GET http://localhost:${PORT}/notes/${id}
echo