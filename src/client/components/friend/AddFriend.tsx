import { MouseEvent, FunctionComponent, ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { createFriendFlow } from "../../redux/friend/FriendActions";

// Own props that are passed into the component
interface AddFriendProps {
  className?: string;
}

// Functional component
const handleSubmit = (dispatch: Dispatch, firstName: string, lastName: string) => (
  event: MouseEvent<HTMLButtonElement>
) => {
  dispatch(createFriendFlow.try({ firstName, lastName }));
};

const AddFriend: FunctionComponent<AddFriendProps> = (props) => {
  const dispatch = useDispatch();

  // provides the same capabilities as this.state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        value={firstName}
        placeholder="First name"
        onChange = {(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        placeholder="Last name"
        onChange = {(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
      />
      <button onClick={handleSubmit(dispatch, firstName, lastName)}>Save</button>
    </div>
  );
};

// exported functional component
export default AddFriend;
