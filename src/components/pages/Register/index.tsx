import React from "react";

import Toolbar from "../../molecules/Toolbar";
import RegisterForm from "../../organisms/forms/RegisterForm";
import "../style.css";

export default function Register() {
  return (
    <>
      <Toolbar title="Create new account" />
      <div className="page">
        <p>
          You are creating a sharer account. This means you will be sharing your
          state of mind with your supporters. If you want to support someone
          else, you can create an account using the link shared by that person.
        </p>
        <RegisterForm type="sharer" />
      </div>
    </>
  );
}
