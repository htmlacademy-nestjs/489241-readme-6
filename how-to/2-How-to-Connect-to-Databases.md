# Pre-Requisite

1. Run in Dev Container or with Docker Compose all environment. More details here [How to Run Applications](./1-How-to-Run-Applications.md)

# Connect To Mongo

## Connect via Mongo Express
1. Follow steps of How To > Develop in VS Code DevContainer
2. on your machine open browser and navigate to [http://localhost:8081/](http://localhost:8081/)
3. It will request username and password
   1. username - admin
   2. password - pass

## Connect via Mongo VS Code Extension
> **NOTE** This DevContainer has required VS Code extensions. One of it [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

1. Follow steps of How To > Develop in VS Code DevContainer
2. Open "MongoDB for VS Code" and create new connection `mongodb://admin:admin@mongodb:27017/`

> **NOTE** Here we use service name `mongodb` as we are working from DevContainer that based on Docker Compose

## Connect via MongoDB Compass
1. Download application [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
2. Open application and create new connection like this `mongodb://admin:admin@localhost:27017/`
3. Press Connect button

# Connect to PostgresSQL

## Connect via Azure Data Studio
1. Download and install application [Azure Data Studio](https://learn.microsoft.com/en-us/azure-data-studio/download-azure-data-studio)
2. Install PostgreSQL extension to Azure Data Studio (identified - microsoft.azuredatastudio-postgresql)
3. Create new connection and select PostgreSQL
4. Specify the following settings

![Connect via Azure Data Studio](../images/02-Connect-to-Postgres-1.png)

> **NOTE** Password is 'postgres'

## Connect via SQLTools VS Code Extension
> **NOTE** This DevContainer has required VS Code extensions. One of it [SQLTools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools) and addition to it [SQLTools PostgreSQL/Cockroach Driver](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-pg)

1. Follow steps of How To > Develop in VS Code DevContainer
2. Open extension "SQLTools" and create connection like shown below

![Connect via SQLTools Extension](../images/03-Connect-to-Postgres-2.png)

> **NOTE** Password is 'postgres'
