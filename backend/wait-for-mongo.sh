#!/bin/sh
echo "Waiting for MongoDB at mongo:27017..."

until wget -qO- http://mongo:27017 >/dev/null 2>&1; do
  echo "MongoDB not ready yet..."
  sleep 1
done

echo "MongoDB is up. Starting backend..."
exec "$@"

