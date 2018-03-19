# notes-backend-redis

[![CircleCI](https://circleci.com/gh/sylvainmetayer/notes-backend-redis.svg?style=svg)](https://circleci.com/gh/sylvainmetayer/notes-backend-redis) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![GitHub release](https://img.shields.io/github/release/sylvainmetayer/notes-backend-redis.svg) [![Depfu](https://badges.depfu.com/badges/4034a6e0304e200260c1dfeb90959459/overview.svg)](https://depfu.com/github/sylvainmetayer/notes-backend-redis) [![codecov](https://codecov.io/gh/sylvainmetayer/notes-backend-redis/branch/master/graph/badge.svg)](https://codecov.io/gh/sylvainmetayer/notes-backend-redis)

TP Redis de simulation de serveur de prise de notes

## Install it

```bash
npm install
```

## Run it

`npm start`

## Test it

`npm test`

## Lint it

This project use [StandardJS](https://standardjs.com) as linter with a pre-commit hook.

To configure text editor, see [this link](https://standardjs.com/#are-there-text-editor-plugins).

To run linter : `npm run lint`

To run linter with auto-fix : `npm run lint-fix`

## Demonstration

```bash
npm start
./test.sh # In a separate terminal
```

## Explications

### Architecture

Un serveur Express répond au requêtes clientes, sur 5 routes différentes :

- '/notes' en POST, qui permet la création d'une note en text/plain

- '/notes-details' en POST, qui permet la création d'une note en passant des données au format application/json, ce qui permet de rajouter en plus le champ auteur.

- '/note/:id' en GET, qui permet de récupérer une note selon son identifiant

- '/notes' en GET, qui renvoie toutes les notes existantes.

- '/notes/:id' en DELETE, qui permet de supprimer une note donnée.

Un exemple d'utilisation du système est disponible dans le script `test.sh`
