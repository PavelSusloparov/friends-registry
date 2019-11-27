# React-apollo-graphql-mongo

* Server [Readme](server/README.md)
* Client [Readme](client/README.md)

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

Start client in another console tab
```bash
cd client
npm install
npm start
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