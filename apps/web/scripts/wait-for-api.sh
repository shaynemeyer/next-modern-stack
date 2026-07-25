#!/usr/bin/env bash
set -euo pipefail

HOST="localhost"
PORT="3001"

echo "Waiting for API on ${HOST}:${PORT}..."
until nc -z "${HOST}" "${PORT}" 2>/dev/null; do
  sleep 0.5
done
echo "API is up, starting web dev server."
