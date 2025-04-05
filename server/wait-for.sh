#!/bin/sh

echo "Esperando que la base de datos esté lista en $DB_HOST:$DB_PORT..."

# Espera hasta que pueda hacer conexión al host y puerto
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Esperando a la base de datos..."
  sleep 1
done

echo "Base de datos lista. Iniciando servidor..."
exec "$@"