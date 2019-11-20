import * as React from "react";
import {connect} from "react-redux";
import {getFriends} from "../../actions/friend";
import {RootState} from "../../reducers";

export namespace GetFriends {
  export interface Props {
    friends: FriendStoreState,
    loadFriends?: () => void;
    className?: string;
  }

  export interface State {
    /* empty */
  }
}

/**
 * Maps redux state to the component props
 */
const mapStateToProps = (state: RootState) => {
  return {
    friends: state.friends
    // ...mapStateToProps
  };
};

/**
 * Maps redux actions to the component props
 */
const mapDispatchToProps = (dispatch) => {
  return {
    loadFriends: () =>
      dispatch(getFriends())
    // ...mapDispatchToProps
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export class GetFriend extends React.PureComponent<GetFriends.Props, GetFriends.State> {

    constructor(props?: GetFriends.Props, context?: any) {
      super(props, context);
      this.state = { friends: props.friends };
    }

    public componentDidMount() {
        console.log(`"FriendsRedux componentDidMount!"`);
        this.props.loadFriends()
    }

    public render() {
        return (
            <div>
                Friends are loading...
            </div>
            // <div className={this.props.className}>
            //     {
            //         this.props.getFriendsFlowStep !== FlowStep.Success && (
            //             <div>
            //                 Friends are loading...
            //             </div>
            //         )
            //     }
            //
            //     {this.props.getFriendsFlowStep === FlowStep.Success && (
            //         this.props.friends && (
            //         this.props.friends.length > 0 &&
            //         (
            //             <ul>
            //                 {
            //                     this.props.friends.map(item => (
            //                         <li key="id">{item.firstName} {item.lastName}</li>)
            //                     )
            //                 }
            //             </ul>
            //         )))
            //     }
            // </div>
        );
    }
}
