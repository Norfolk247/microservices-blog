for /F "tokens=1,2 delims==" %%G in (config.ini) do (set %%G=%%H)
set PGPASSWORD=%postgresPassword%
"%postgresRootDir%\bin\psql.exe" -h %databaseServer% -p %postgresPort% -U %postgresUsername% -d postgres -a -f createTables.sql
pause