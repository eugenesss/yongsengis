import React from "react";
import { connect } from "react-redux";

import TabsWrapper from "Components/Everyday/Tabs/TabsWrapper";

import UpdatePasswordForm from "Components/Form/Setting/General/UpdatePasswordForm";
import UpdateUserDetailsForm from "Components/Form/Setting/General/UpdateUserDetailsForm";

import RctSectionLoader from "Components/RctSectionLoader";

import { Person, SupervisedUserCircle } from "@material-ui/icons";

const UserFeedBlock = ({ loggedInUser, loading }) => {
  return (
    <React.Fragment>
      <TabsWrapper>
        <div icon={<Person />} label="Update Personal Details">
          {loading ? (
            <RctSectionLoader />
          ) : (
            <UpdateUserDetailsForm user={loggedInUser} />
          )}
        </div>
        <div icon={<SupervisedUserCircle />} label="Update Password">
          <UpdatePasswordForm />
        </div>
      </TabsWrapper>
    </React.Fragment>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loggedInUser, loading } = authUser;
  return { loggedInUser, loading };
};

export default connect(mapStateToProps)(UserFeedBlock);
