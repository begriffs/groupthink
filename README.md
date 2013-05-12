## Group voting for presentation speed

You're watching a talk that is going too slowly. Vote to have the
speaker go faster This app aggregates the crowd's whim and shows a
realtime guage.

### Running the server locally

    npm install
    bower install
    brew install mongodb
    mongod

    node server.js

### Deploying to nodejitsu

    npm install
    grunt optimize
    npm install jitsu -g
    jitsu signup
    jitsu login
    jitsu apps create your-app
    jitsu databases create mongo your-db-name
    # note the connection string provided
    jitsu env set MONGO_CONNECTION connection-string
    jitsu deploy
