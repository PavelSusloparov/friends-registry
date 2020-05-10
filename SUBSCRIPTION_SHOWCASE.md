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
    id:"selected_id_from_previous_call"
    firstName: "John"
    lastName: "Smith"
  }) {
    id
    firstName
    lastName
  }
}
```
* See the updated friends list on UI
```bash
http://localhost:3000/
```