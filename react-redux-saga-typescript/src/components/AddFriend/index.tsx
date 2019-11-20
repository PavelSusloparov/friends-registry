import * as React from "react";
import {connect} from "react-redux";
import {addFriend} from "../../actions/friend";
import {RootState} from "../../reducers";


export namespace AddFriend {
  export interface Props {
    onSave: (firstName: string, lastName: string) => void;
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
    // ...mapStateToProps
  };
};

/**
 * Maps redux actions to the component props
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (firstName: string, lastName: string) => {
      dispatch(addFriend({firstName: firstName, lastName: lastName}))
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export class AddFriends extends React.PureComponent<AddFriend.Props, AddFriend.State> {

    public state = {
        firstName: '',
        lastName: ''
    };

    public handleSave = () => {
        const {firstName, lastName} = this.state;
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
