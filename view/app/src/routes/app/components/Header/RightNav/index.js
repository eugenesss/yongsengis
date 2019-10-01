import React from "react";
// import Notifications from "Components/Header/RightNav/Notifications";
import UserDrawer from "Components/Header/RightNav/UserDrawer";
import QuickAdd from "Components/Header/RightNav/QuickAdd";

export default function RightNav() {
  return (
    <ul className="navbar-right app-bar-right list-inline mb-0">
      <QuickAdd />
      {/* <Notifications /> */}
      <UserDrawer />
    </ul>
  );
}
