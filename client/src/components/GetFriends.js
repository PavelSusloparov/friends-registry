import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getFriendsQuery } from '../graphql/GetFriendsQuery';
import { friendUpdated } from '../graphql/FriendUpdated';

class GetFriends extends Component {
    componentDidMount() {
        console.log(this.props);
        this.props.data.subscribeToMore({
            document: friendUpdated,
            variables: {
                id: 'subscriptionId',
            },
            updateQuery: (prev, { subscriptionData }) => {
                console.log(`prev: ${prev}`);
                if (!subscriptionData.data) {
                    return prev;
                }
                console.log(`subscriptionData: ${subscriptionData}`);
                const newFriend = subscriptionData.data.friendUpdated;
                console.log(`newFriend: ${newFriend}`);
                if (!prev.getFriends.find((item) => item.id === newFriend.id)) {
                    return Object.assign({}, prev, {
                        getFriends: Object.assign({}, prev.getFriends, {
                            getFriends: [...prev.getFriends, newFriend],
                        }),
                    });
                }
                return prev;
            },
        });
    }

    render() {
        const {
            data: { loading, error, getFriends },
        } = this.props;

        console.log(`
            loading: ${loading}
            error: ${error}
            getFriends: ${getFriends}
          `);
        if (loading) {
            return <p>Loading...</p>;
        }
        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <div>
                <h5>Your friends</h5>
                <ul>
                    {getFriends.map((item) => (
                        <li key={item.id}>
                            {item.firstName} {item.lastName}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default graphql(getFriendsQuery)(GetFriends);
