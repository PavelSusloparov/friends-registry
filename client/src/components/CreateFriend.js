import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { createFriendMutation } from '../graphql/CreateFriendMutation';
import { getFriendsQuery } from '../graphql/GetFriendsQuery';
import PropTypes from 'prop-types';

class CreateFriend extends Component {
    propTypes = { mutate: PropTypes.func.isRequired };

    state = { firstName: '', lastName: '' };

    handleSave = () => {
        const newId = Math.round(Math.random() * -1000000);
        const { firstName, lastName } = this.state;
        this.props
            .mutate({
                variables: { firstName, lastName },
                optimisticResponse: {
                    createFriend: {
                        firstName: firstName,
                        lastName: lastName,
                        id: newId,
                        __typename: 'Friend',
                    },
                },
                update: (store, { data: { createFriend } }) => {
                    const data = store.readQuery({ query: getFriendsQuery });
                    console.log(`data before: ${JSON.stringify(data)}`);
                    console.log(`Add a new friend: ${createFriend}`);
                    data.getFriends.push(createFriend);
                    console.log(`data after: ${JSON.stringify(data)}`);
                    store.writeQuery({ query: getFriendsQuery, data });
                },
            })
            .then(() => {
                this.setState({
                    firstName: '',
                    lastName: '',
                });
            });
    };

    render() {
        return (
            <div>
                <h5>Add a friend</h5>
                <input
                    value={this.state.firstName}
                    placeholder="First name"
                    onChange={(e) => this.setState({ firstName: e.target.value })}
                />
                <input
                    value={this.state.lastName}
                    placeholder="Last name"
                    onChange={(e) => this.setState({ lastName: e.target.value })}
                />
                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
}

const AddFriendWithMutation = graphql(createFriendMutation)(CreateFriend);

export default AddFriendWithMutation;
