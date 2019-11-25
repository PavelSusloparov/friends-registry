import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type Contact {
    id: ID!
    firstName: String
    lastName: String
    notes: [Note]!
  }

  input NoteInput {
    contactId: ID!
    details: String
  }

  type Note {
    id: ID!
    details: String
  }

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
    contacts: [Contact]
    contact(id: ID!): Contact
    getFriends: [Friend]
    getOneFriend(id: ID!): Friend
  }

  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
    addNote(note: NoteInput!): Note
    createFriend(input: FriendInput): Friend
    updateFriend(input: FriendInput): Friend
    deleteFriend(id: ID!): String
  }

  type Subscription {
    noteAdded(contactId: ID!): Note
    friendUpdated(id: ID!): Friend
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
