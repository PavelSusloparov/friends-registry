import {FlowStep} from "../../utils/redux/ReduxHelpers"

import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import styled from "styled-components";
import {GetFriends_getFriends} from "../../generated/graphql/generatedTypes";
import {getFriendsFlow} from "../../redux/friend/FriendActions";

// Redux provided props via mapStateToProps
interface FriendsReduxStateProps {
    friends: GetFriends_getFriends[],
    getFriendsFlowStep: FlowStep
}

// Redux provided props via mapDispatchToProps
interface FriendsReduxDispatchProps {
    loadFriends: () => void;
}

// Own props that are passed into the component
interface FriendsReduxOwnProps {
    className?: string;
}

// Merged props of the above interfaces
type FriendsReduxProps = FriendsReduxStateProps & FriendsReduxDispatchProps & FriendsReduxOwnProps;

// Own state that is created inside the component
interface FriendsReduxState {
}

// Exported base (non-connected) component
export class FriendsReduxBase extends React.PureComponent<FriendsReduxProps, FriendsReduxState> {

    public componentDidMount(): void {
        console.log(`
      "FriendsRedux componentDidMount!"
    `);
        this.props.loadFriends()
    }

    public render() {
        return (
            <div className={this.props.className}>
                {
                    this.props.getFriendsFlowStep !== FlowStep.Success && (
                        <div>
                            Friends are loading...
                        </div>
                    )
                }

                {this.props.getFriendsFlowStep === FlowStep.Success && (
                    this.props.friends && (
                    this.props.friends.length > 0 &&
                    (
                        <ul>
                            {
                                this.props.friends.map(item => (
                                    <li key="id">{item.firstName} {item.lastName}</li>)
                                )
                            }
                        </ul>
                    )))
                }
            </div>
        );
    }
}

/**
 * Maps redux state to the component props
 */
const mapStateToProps = (state: any): FriendsReduxStateProps => {
    return {
        friends: state.getFriendsReducer.friends,
        getFriendsFlowStep: state.getFriendsReducer.getFriendsFlowStep
        // ...mapStateToProps
    };
};

/**
 * Maps redux actions to the component props
 */
const mapDispatchToProps = (dispatch: Dispatch): FriendsReduxDispatchProps => {
    return {
        loadFriends: () =>
            dispatch(getFriendsFlow.try({}))
        // ...mapDispatchToProps
    };
};

/**
 * Export the connected component
 */
export const FriendsReduxConnected = connect<FriendsReduxStateProps, FriendsReduxDispatchProps, FriendsReduxOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(FriendsReduxBase);

/**
 * Export the styled connected component
 */
export const FriendsRedux = styled(FriendsReduxConnected)``;
