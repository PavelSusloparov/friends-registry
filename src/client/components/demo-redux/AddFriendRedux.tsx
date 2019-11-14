import { FlowStep, populateStore } from "@redtech/keystone-client";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { createFriendFlow, getFriendsFlow } from "../../redux/friend/friendActions";

// Redux provided props via mapStateToProps
interface AddFriendReduxStateProps {}

// Redux provided props via mapDispatchToProps
interface AddFriendReduxDispatchProps {
  onSave: (firstName: string, lastName: string) => void;
}

// Own props that are passed into the component
interface AddFriendReduxOwnProps {
  className?: string;

}

// Merged props of the above interfaces
type AddFriendReduxProps = AddFriendReduxStateProps & AddFriendReduxDispatchProps & AddFriendReduxOwnProps;

// Own state that is created inside the component
interface AddFriendReduxState {}

// Exported base (non-connected) component
export class AddFriendReduxBase extends React.PureComponent<AddFriendReduxProps, AddFriendReduxState> {

  public state = {
    firstName: '',
    lastName: ''
  };

  public handleSave = () => {
    const {firstName, lastName } = this.state;
    this.props.onSave(firstName, lastName)
  };

  public render() {
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
    );
  }
}

/**
 * Maps redux state to the component props
 */
const mapStateToProps = (state: any): AddFriendReduxStateProps => {
  return {
    // ...mapStateToProps
  };
};

/**
 * Maps redux actions to the component props
 */
const mapDispatchToProps = (dispatch: Dispatch): AddFriendReduxDispatchProps => {
  return {
    onSave: (firstName: string, lastName: string) => {
      dispatch(createFriendFlow.try({ firstName: firstName, lastName: lastName }))
    }
  };
};

/**
 * Export the connected component
 */
export const AddFriendReduxConnected = connect<AddFriendReduxStateProps, AddFriendReduxDispatchProps, AddFriendReduxOwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(AddFriendReduxBase);

/**
 * Export the styled connected component
 */
export const AddFriendRedux = styled(AddFriendReduxConnected)``;
