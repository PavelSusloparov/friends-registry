import * as React from "react";
import styled from "styled-components";
import { AddFriendRedux } from "./AddFriendRedux";
import { FriendsRedux } from "./FriendsRedux";

export const FriendContainerWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding: 20px;
  margin: 20px 0;

  div {
    padding: 20px;
  }
`;

export const FriendContainerRedux = () => {
  return(
    <FriendContainerWrapper>
        <div>
          <AddFriendRedux />
          <FriendsRedux />
        </div>
    </FriendContainerWrapper>
  )
};
