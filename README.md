This site was created to trade any products such as snacks, fish, sweets and e.t.

If you need building data base
you can use this commands

pg_dump -U postgres atlantica > atlantica.sql

and add this to the server
When you start the server and submit this site
open database using:

psql -U username -d dbname -f database_dump.sql
or
psql -U username -f database_dump.sql
