# Friends-registry

This is a sample project to showcase the following capabilities:
* JavaScript/React/Apollo GraphQL/Mongo stack
* Optimistic components rendering
* Apollo GraphQL subscription

## Documentation
* [Server Readme](server/README.md)
* [Client Readme](client/README.md)
* [Subscription showcase](SUBSCRIPTION_SHOWCASE.md)

## Pre-requirements for local environment setup (MacOSX)

- Install brew
Follow instruction [https://brew.sh/](https://brew.sh/)

- Install nvm

```bash
brew install nvm

*Hint:*
if you use zsh and get a message `zsh: command not found: nvm` then add the snippet below to your .zshrc file
```

```bash
# For brew, at least
export PATH=/usr/local/opt:/usr/local/bin:$PATH

# NVM Stuff
export NVM_DIR="$HOME/.nvm"
. "$(brew --prefix nvm)/nvm.sh"
``` 

- Install node
```bash
nvm install 12
nvm alias default 12
nvm use 12
```

- Install docker

    Follow instruction [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

- Install docker-compose

    Follow instruction [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

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