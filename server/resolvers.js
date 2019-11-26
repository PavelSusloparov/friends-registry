import { PubSub, withFilter } from 'graphql-subscriptions';
import {Friends} from "../server/dbConnectors";
import {reject} from "lodash";

const pubsub = new PubSub();
const FRIEND_UPDATED = 'FRIEND_UPDATED';

const contacts = [
  {
    id: '1',
    firstName: 'Manny',
    lastName: 'Henri',
    notes: [
      { 
        id: '1',
        details: 'I think this guy is an author at linkedin'
      },
      { 
        id: '2',
        details: 'His name is Manny'
      }
    ]
  },
  {
    id: '2',
    firstName: 'Jasmine',
    lastName: 'Henri-Rainville',
    notes: [
      { 
        id: '1',
        details: 'I think this guy is an author at linkedin'
      },
      { 
        id: '2',
        details: 'His name is Manny'
      }
    ]
  },
    {
    id: '3',
    firstName: 'Jeremy',
    lastName: 'Henri-Rainville',
    notes: [
      { 
        id: '1',
        details: 'I think this guy is an author at linkedin'
      },
      { 
        id: '2',
        details: 'His name is Manny'
      }
    ]
  }
];

export const resolvers = {
  Query: {
    contacts: () => {
      return contacts;
    },
    contact: (root, { id }) => {
      return contacts.find(contact => contact.id === id);
    },
    getOneFriend: (root, {id}) => {
      return new Promise((resolve, object) => {
        Friends.findById(id, (err, friend) => {
          if (err) reject(err);
          else resolve(friend)
        });
      });
    },
    getFriends: (root) => {
      return Friends.find();
    }
  },
  Mutation: {
    addContact: (root, args) => {
      const newContact = { id: args.id, firstName: args.firstName, lastName: args.lastName, notes: [] };
      contacts.push(newContact);
      return newContact;
    },
    addNote: (root, { note }) => {
      const newId = require('crypto').randomBytes(5).toString('hex');
      const contact = contacts.find(contact => contact.id === note.contactId);
      const newNote = { id: String(newId), details: note.details };
      contact.notes.push(newNote);
      pubsub.publish('noteAdded', { noteAdded: newNote, contactId: note.contactId });
      return newNote;
    },
    createFriend: (root, {input}) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        age: input.age,
        language: input.language,
        email: input.email,
        contacts: input.contacts
      });

      newFriend.id = newFriend._id;

      return new Promise((resolve, object) => {
        newFriend.save((err) => {
          if (err) reject(err);
          else resolve(newFriend);
        })
      });
    },
    updateFriend: (root, {input}) => {
      return new Promise((resolve, object) => {
        Friends.findOneAndUpdate({_id: input.id}, input, {new: true}, (err, friend) => {
          if (err) reject(err);
          else {
            console.log("Send FRIEND_UPDATED event");
            pubsub.publish(FRIEND_UPDATED, {friendUpdated: friend});
            resolve(friend);
          }
        })
      })
    },
    deleteFriend: (root, {id}) => {
      return new Promise((resolve, object) => {
        Friends.remove({_id: id}, (err) => {
          if (err) reject(err);
          else resolve('Successfully deleted friend')
        })
      })
    }
  },
  Subscription: {
    noteAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator('noteAdded'), (payload, variables) => {
        return payload.contactId === variables.contactId;
      }),
    },
    friendUpdated: {
      subscribe: () => pubsub.asyncIterator(FRIEND_UPDATED),
    },
  },
};
