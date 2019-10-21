import React, { PureComponent } from "react";
import { connect } from "react-redux";

class AccessComponent extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { loggedInUser, children } = this.props;
    if (loggedInUser.is_admin == true) return children;
    else return null;
  }
}

const mapStateToProps = ({ sessionState }) => {
  const { loggedInUser } = sessionState.authState;
  return { loggedInUser };
};

export default connect(mapStateToProps)(AccessComponent);
