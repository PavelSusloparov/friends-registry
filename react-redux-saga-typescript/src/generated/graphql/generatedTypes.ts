/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createFriend
// ====================================================

export interface createFriend_createFriend {
    __typename: "Friend";
    id: string;
    firstName: string;
    lastName: string;
}

export interface createFriend {
    createFriend: createFriend_createFriend | null;
}

export interface createFriendVariables {
    firstName: string;
    lastName: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFriends
// ====================================================

export interface GetFriends_getFriends {
    __typename: "Friend";
    id: string;
    firstName: string;
    lastName: string;
}

export interface GetFriends {
    getFriends: (GetFriends_getFriends | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOneFriend
// ====================================================

export interface GetOneFriend_getOneFriend {
    __typename: "Friend";
    id: string;
    firstName: string;
    lastName: string;
}

export interface GetOneFriend {
    getOneFriend: GetOneFriend_getOneFriend | null;
}

export interface GetOneFriendVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: FriendUpdated
// ====================================================

export interface FriendUpdated_friendUpdated {
    __typename: "Friend";
    id: string;
    firstName: string;
    lastName: string;
}

export interface FriendUpdated {
    friendUpdated: FriendUpdated_friendUpdated | null;
}

export interface FriendUpdatedVariables {
    id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
