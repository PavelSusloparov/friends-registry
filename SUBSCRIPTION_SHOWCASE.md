## Subscription showcase

* Add a new friend
* Access GraphQL playground
```bash
http://localhost:4000/graphql
```
* Fetch a friend id
```graphql
query {
  getFriends {
    id
    firstName
    lastName
  }
}
```
* Update a friend 
```graphql
mutation {
  updateFriend(input: {
    id:"YOUR_ID"
    firstName: "John"
    lastName: "Smith"
  }) {
    id
    firstName
    lastName
  }
}
```
* See the updated friends list in the web
```bash
http://localhost:3000/
```