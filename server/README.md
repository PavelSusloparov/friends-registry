Install app
```bash
yarn install
```

Install mongo
```bash
docker-compose up
```

Install Robo 3T mongodb client from [here](https://robomongo.org/download)

Start server
```bash
yarn start
```

Access to GraphQL console
```bash
http://localhost:8080/graphql
```

Create a friend
```
mutation {
  mutation {
    createFriend(input: {firstName: "John", lastName: "Smith"}) {
      id
    }
  }
}
```

Fetch all friends
```
query {
  getFriends {
    id
    firstName
    lastName
  }
}
```
Fetch one friend
```
query {
  getOneFriend(id: "5dceb8c931fe651d6851267c") {
    id
    firstName
    lastName
  }
}
```

Access the mongo client(ex: Robo 3T) and verify that you have a new document created.
Use RSV string and check off 'Use SSL protocol' checkbox
```
mongodb://sa:sa@0.0.0.0:27018/friends?authSource=admin
```
