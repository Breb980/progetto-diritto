# progetto-diritto
TODO 

## Dependencies
[Docker](https://www.docker.com/)

## How to use
Use following command for enviroment composition:

- _docker compose build_

You can build and run simultaneously:

- _docker compose up --build_

## run webapp
- _docker compose up_

## stop webapp
- _docker compose down_

## Architetture
- **Frontend:** [Next.js](https://nextjs.org/) (React) → user interface
- **Backend:** [Express.js](https://expressjs.com/) (Node.js) → API REST
- **Database:** [PostgreSQL](https://www.postgresql.org/) → data persistence
- **Containerization:** [Docker](https://www.docker.com/) → service isolation

## Ports
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Database:** PostgreSQL on port 5432