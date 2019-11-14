import { FlowStep } from "@redtech/keystone-client";
import { GetFriends_getFriends } from "../../generated/graphql/generatedTypes";

export interface FriendShape {
    friends: GetFriends_getFriends[];
    friendsFlowStep: FlowStep;
    addFriendFlowStep: FlowStep;
    errorMessage: string;
}
