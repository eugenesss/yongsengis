import React from "react";

// Default msg
import DefaultSettingMessage from "./ViewComponents/DefaultSettingMessage";

// User Settings
import UserManagement from "./ViewComponents/UserManagement";
import NewUser from "./ViewComponents/NewUser";

const SettingsViewRender = ({ componentToRender }) => {
  switch (componentToRender) {
    //===================
    // User Settings
    //===================
    case "userManagement":
      return <UserManagement />;
    case "newUser":
      return <NewUser />;
    default:
      return <DefaultSettingMessage />;
  }
};

export default SettingsViewRender;
