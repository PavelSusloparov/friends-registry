import React from "react";
import { graphql } from "react-apollo";
import { getFriends } from "../../redux/friend/graphql/queries/GetFriends";

const FriendsApollo = ({ data: { loading, error, getFriends }}) => {
  console.log(`
    loading: ${loading}
    error: ${error}
    getFriends: ${getFriends}
  `);
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <ul>
      { getFriends.map( item =>
        (<li key={item.id}>{item.firstName} {item.lastName}</li>)
      )}
    </ul>
  );
};

export default graphql(getFriends)(FriendsApollo);
