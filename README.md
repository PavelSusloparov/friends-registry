# Friends-registry

This is a sample project to showcase the following capabilities:
* JavaScript/React/ApolloGraphQL/Mongo stack
* Optimistic components rendering
* ApolloGraphQL subscription

## Documentation
* Server [Readme](server/README.md)
* Client [Readme](client/README.md)
* [Subscription showcase](SUBSCRIPTION_SHOWCASE.md)

## Run applications

Start mongo database
```bash
docker-compose up -d
```

Start server in one console tab
```bash
cd server
npm install
npm start
```
Access GraphQL playground
```bash
http://localhost:4000/graphql
```

Start client in another console tab
```bash
cd client
npm install
npm start
```

Access the application
```bash
http://localhost:3000/
```

## Hints

If the pid file was deleted without stopping the process, use lsof to find process pid
```bash
lsof -i tcp:3000
```
and
```bash
lsof -i tcp:4000
```