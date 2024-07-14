# Project Setup for Windows Users

## Prerequisites

- Ensure you have PostgreSQL installed on your system.

## Configuration

1. Create a `config.ini` file in the root directory of the project with the following content:

    ```ini
    postgresRootDir=path to postgres
    postgresDataDir=path to postgres data
    databaseServer=host
    postgresPort=port
    postgresUsername=user
    postgresPassword=password
    ```

   Replace the placeholders with your actual PostgreSQL configuration values.

## Initialization

1. Run `initDatabase.bat` to create the necessary tables and database for the project.

    ```sh
    initDatabase.bat
    ```

2. Start the PostgreSQL service by running `startPostgres.bat`.

    ```sh
    startPostgres.bat
    ```