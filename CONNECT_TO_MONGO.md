# Mongo database

## Client

### Pre-requisites:
1. Follow steps from [README.md](README.md) and run mongo in a docker container.
2. Verify that container is running using
```bash
docker ps
```

### Connect to the database
1. Go to [https://robomongo.org/](https://robomongo.org/)
2. Click 'Download Robo 3T only'. The client is free.
3. Install the database client
4. Create a new connection by clicking top left corner 2 monitors icon.
5. Connection credentials:
* Host: localhost
* Port: 27018
* Database: admin
* Login: sa
* Password: sa

### Update friends

Either by following [SUBSCRIPTION_SHOWCASE.md](SUBSCRIPTION_SHOWCASE.md) steps through GraphQL
or by creating a new friend through UI.

Verify that MongoDB has a one document(friends entity) created.