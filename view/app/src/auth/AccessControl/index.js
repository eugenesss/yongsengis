import React, { PureComponent } from "react";
import { connect } from "react-redux";

class AccessComponent extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentUser, children } = this.props;
    if (currentUser.is_admin == true) return children;
    else return null;
  }
}

const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;
  return { currentUser };
};

export default connect(mapStateToProps)(AccessComponent);
