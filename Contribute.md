Docker installation

Install and start Docker Desktop.

Create a network:

docker network create user_project

Start PostgreSQL:

docker run --name user-postgres --network user_project -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=project1 -d -p 5432:5432 postgres:17

Wait until PostgreSQL is ready:

docker exec user-postgres pg_isready -U postgres -d project1

Build the application image from the project root:

docker build -t user-project .

Start the application container:

docker run --name user-project-app --network user_project -e "DATABASE_URL=postgresql://postgres:mysecretpassword@user-postgres:5432/project1?schema=public" -d -p 3000:3000 user-project

Open the application at http://localhost:3000.

Docker Compose installation steps

Install and start Docker Desktop.

Make sure the repository contains a compose.yaml or docker-compose.yml file.

Run from the project root:

docker compose up --build -d

To view logs:

docker compose logs -f

To stop the services:

docker compose down


