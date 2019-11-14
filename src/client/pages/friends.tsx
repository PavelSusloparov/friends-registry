import { FlowStep } from "../utils/redux/ReduxHelpers";
import { populateStore } from "../utils/redux/PopulateStore";
import { WhenFlow, WhenFlowChildFunctionArgs } from "../utils/redux/WhenFlow"

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux'
import { ApplicationNextContext } from "../../types/application";
import AddFriend from "../components/friend/AddFriend";
import { getFriendsFlow, subscribeOnFriendUpdateFlow } from "../redux/friend/FriendActions";

// Own props that are passed into the component
interface FriendsProps {
    className?: string;
    stars?: string;
    message?: string;
}

const FriendsComponent: React.FunctionComponent<FriendsProps> = props =>  {
    // get your dispatcher here. Those actions will be executed on the client side
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends);

    return (
        <div className={props.className}>
            <AddFriend />

            <WhenFlow flow={friends.friendsFlowStep} equals={FlowStep.Started || FlowStep.Trying}>
                <div>
                    Friends are loading...
                </div>
            </WhenFlow>

            <WhenFlow flow={friends.friendsFlowStep} equals={FlowStep.Failed}>
                <div>
                    {friends.errorMessage}
                </div>
            </WhenFlow>

            <WhenFlow flow={friends.friendsFlowStep} equals={FlowStep.Success}>
                {({ isMatch }: WhenFlowChildFunctionArgs) => isMatch && (
                    <ul>
                        {
                            friends.friends.map(
                                item => {
                                    dispatch(subscribeOnFriendUpdateFlow.try({id: item.id}));
                                    return (
                                        <li key={item.id}>{item.firstName} {item.lastName}</li>
                                    );
                                }
                            )
                        }
                    </ul>
                )}
            </WhenFlow>
        </div>
    );
};

const mapStateToProps = (state /*, ownProps*/) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = { increment, decrement, reset }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

FriendsComponent.getInitialProps = async (ctx: ApplicationNextContext) => {
    await populateStore({
        dispatch: () => {
            console.log("Dispatch!");
            ctx.store.dispatch(getFriendsFlow.try({}));
        },
        waitFor: () => {
            const state = ctx.store.getState();
            return !!(state.friends &&
                state.friends.friends &&
                state.friends.friendsFlowStep === FlowStep.Done
            );
        },
        timeout: 1000
    });
    return {};
};

export default FriendsComponent;
