import React, { Component } from "react";
import { graphql } from "react-apollo";
import {createFriendMutation} from "./graphql/CreateFriendMutation";
import {getFriendsQuery} from "./graphql/GetFriendsQuery";

class CreateFriend extends Component {
    state = {
        firstName: '',
        lastName: ''
    };

    handleSave = ({ mutate }) => {
        const {firstName, lastName } = this.state;
        this.props.mutate({
          variables: {firstName, lastName},
          update: (store, {data: { createFriend }}) => {
            const data = store.readQuery({ query: getFriendsQuery});
            console.log(`data before: ${JSON.stringify(data)}`);
            console.log(`newFriend: ${createFriend}`);
            data.getFriends.push(createFriend);
            console.log(`data after: ${JSON.stringify(data)}`);
            store.writeQuery({ query: getFriendsQuery, data });
          }
        })
          .then( () => {
            this.setState({
              firstName: '',
              lastName: ''
            });
          });
    };

    render () {
        return (
          <div>
            <input
              value={this.state.firstName}
              placeholder='First name'
              onChange={(e) => this.setState({firstName: e.target.value})}
            />
            <input
              value={this.state.lastName}
              placeholder='Last name'
              onChange={(e) => this.setState({lastName: e.target.value})}
            />
            <button onClick={this.handleSave}>Save</button>
          </div>
        )
    }
}

const AddFriendWithMutation = graphql(createFriendMutation)(CreateFriend);

export default AddFriendWithMutation;
