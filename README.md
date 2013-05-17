## Get realtime feedback from a crowd

### Try a [demo]()

This app aggregates a crowd's whim and shows a realtime guage.

Ways to use it
* A meeting bullshit meter
* Feedback for your public speaking
* Rating karaoke
* Gong show

### Deploy your own groupthink server

Clone this repo, go into its directory and run:

    npm install
    bower install
    grunt precompile
    npm install jitsu -g
    jitsu signup
    jitsu login
    jitsu apps create your-app
    jitsu databases create mongo your-db-name
    # note the connection string provided
    jitsu env set MONGO_CONNECTION connection-string
    jitsu deploy

### or run it locally

    npm install
    bower install
    grunt precompile
    brew install mongodb
    mongod

    node server.js

