import React, { Component } from "react";
import { connect } from "react-redux";

import UserBlock from "Components/Setting/General/Profile/UserBlock";
import UserFeedBlock from "Components/Setting/General/Profile/UserFeedBlock";

class MyProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggedInUser } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4">
            <UserBlock user={loggedInUser} />
          </div>
          <div className="col-8">
            <UserFeedBlock />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { loggedInUser } = authUser;
  return { loggedInUser };
};

export default connect(mapStateToProps)(MyProfile);
