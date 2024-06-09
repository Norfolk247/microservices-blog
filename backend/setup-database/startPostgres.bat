for /F "tokens=1,2 delims==" %%G in (config.ini) do (set %%G=%%H)
%postgresRootDir%\bin\pg_ctl start -D %data%
echo postgres stared
pause