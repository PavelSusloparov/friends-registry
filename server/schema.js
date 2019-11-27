import {makeExecutableSchema} from 'graphql-tools';
import {resolvers} from './resolvers';

const typeDefs = `
  input FriendInput {
    id: ID
    firstName: String!
    lastName: String!
    gender: Gender
    age: Int
    language: String
    email: String
  }
  
  type Friend {
    id: ID!
    firstName: String!
    lastName: String!
    gender: Gender
    age: Int
    language: String
    email: String
  }
    
  enum Gender {
    MALE
    FEMALE
    OTHER
  }
   
  type Query {
    getFriends: [Friend]
    getOneFriend(id: ID!): Friend
  }

  type Mutation {
    createFriend(input: FriendInput): Friend
    updateFriend(input: FriendInput): Friend
    deleteFriend(id: ID!): String
  }

  type Subscription {
    friendUpdated(id: ID!): Friend
  }
`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export {schema};
