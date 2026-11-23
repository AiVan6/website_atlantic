#!/bin/sh
# Восстанавливает каталог из atlantica.dump при первом запуске контейнера PostgreSQL.
# Дамп снят с сервера, где владельцем был пользователь "postgres"; в контейнере такой роли нет,
# поэтому инструкции OWNER TO пропускаются — объекты принадлежат пользователю $POSTGRES_USER.
set -eu
grep -v 'OWNER TO' /docker-entrypoint-initdb.d/dump/atlantica.dump \
  | psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB"
