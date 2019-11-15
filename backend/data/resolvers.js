import {Friends} from './dbConnectors';
import {PubSub} from 'graphql-subscriptions';
import {reject} from "lodash";

const pubsub = new PubSub();
const FRIEND_UPDATED = 'FRIEND_UPDATED';

// resolver map
export const resolvers = {
    Query: {
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
        friendUpdated: {
            subscribe: () => pubsub.asyncIterator(FRIEND_UPDATED),
        },
    },
};
