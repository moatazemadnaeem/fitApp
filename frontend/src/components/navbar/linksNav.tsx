import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types";
import { UserSignInInter } from "../../types";
import { Link } from "react-router-dom";

const LinksNav = () => {
  const user = useSelector<RootState>(
    (state) => state.user.user
  ) as UserSignInInter;
  if (user) {
    return (
      <>
        <li className="nlink">
          <Link to="/dashboard"> Dashboard</Link>
        </li>
        <li className="nlink">
          <Link to="/classes"> Classes</Link>
        </li>
        <li className="nlink">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="nlink">
          <Link to="/">Home</Link>
        </li>
      </>
    );
  }
  return (
    <>
      <li className="nlink">
        <Link to="/signin"> Sign In</Link>
      </li>
      <li className="nlink">
        <Link to="/">Home</Link>
      </li>
    </>
  );
};

export default LinksNav;
