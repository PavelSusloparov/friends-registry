import React, { Component } from "react";
import { graphql } from "react-apollo";

import { createFriend } from "../../redux/friend/graphql/queries/CreateFriend";
import { getFriends } from "../../redux/friend/graphql/queries/GetFriends";

class AddFriend extends Component {
  public state = {
    firstName: '',
    lastName: ''
  };

  public handleSave = ({ mutate }) => {
    const {firstName, lastName } = this.state;
    this.props.mutate({
      variables: {firstName, lastName},
      update: (store, {data: { createFriend }}) => {
        const data = store.readQuery({ query: getFriends});
        console.log(`data before: ${JSON.stringify(data)}`);
        console.log(`newFriend: ${createFriend}`);
        data.getFriends.push(createFriend);
        console.log(`data after: ${JSON.stringify(data)}`);
        store.writeQuery({ query: getFriends, data });
      }
    })
      .then( () => {
        this.setState({
          firstName: '',
          lastName: ''
        });
      });
  };

  public render () {
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

const AddFriendWithMutation = graphql(createFriend)(AddFriend);

export default AddFriendWithMutation;
