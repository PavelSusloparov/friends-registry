import {FlowStep} from "../../utils/redux/ReduxHelpers";
import {GetFriends_getFriends} from "../../generated/graphql/generatedTypes";

export interface FriendShape {
    friends: (GetFriends_getFriends | null)[] | null;
    getFriendsFlowStep: FlowStep;
    addFriendFlowStep: FlowStep;
    errorMessage: string;
}
