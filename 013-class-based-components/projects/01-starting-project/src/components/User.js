import { Component } from "react";
import classes from "./User.module.css";

// transformed to class based components
class User extends Component {
  // just for demonstration purpose
  componentWillUnmount() {
    console.log("User will unmount!");
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
