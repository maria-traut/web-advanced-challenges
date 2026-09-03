# Notes API + Redis (Docker Compose Practice)

Small practice project to reinforce Docker Compose concepts: service networking,
named volumes, and environment variables via `.env`.

## What it does

A minimal Node.js service (`notes`) connects to a Redis cache (`cache`) over
the Compose network, using the service name instead of an IP address.

## Setup

1. Copy `.env.example` to `.env` and set your own values.
2. Build and start:

docker compose up -d --build

## What was practiced

- Connecting two services by service name (not localhost/IP)
- Persisting Redis data across container restarts with a named volume (`redisdata`)
- Keeping secrets (password) out of the compose file via `.env`
- Debugging container startup failures with `docker compose logs <service>`

## Verify persistence

docker compose exec cache redis-cli -a $REDIS_PASSWORD SET testkey "hello"
docker compose down
docker compose up -d
docker compose exec cache redis-cli -a $REDIS_PASSWORD GET testkey

should still return "hello"
