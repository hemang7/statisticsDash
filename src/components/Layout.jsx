// Layout.js

import React from "react";
import Navbar from "./Navbar";
import { UserAuth } from "../context/AuthContext";

function Layout({ children }) {
  const { user } = UserAuth();

  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
}

export default Layout;
