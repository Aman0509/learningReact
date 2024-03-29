import { Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
      more: "Test", // You need to define all state inside `this.state` object. `more` is just a sample state, mentioned here for demonstration purposes.
    };
  }

  // this is added to simulate errors which we sometimes cannot handled error and
  // it is not due to some bug introduced by us
  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error("No error provided!");
    }
  }

  toggleUsersHandler() {
    this.setState(
      // this.state.showUsers = false; // this is not the way of setting state
      (curState) => {
        return { showUsers: !curState.showUsers };
      }
    );
  }
  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? "Hide" : "Show"} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
