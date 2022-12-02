import React  from 'react'
import '../style.css'
import RegisterForm from "../../organisms/forms/RegisterForm";
import Toolbar from "../../molecules/Toolbar";

export default function Register() {
  return (
    <>
      <Toolbar title="Register" />
      <div className="page">
        <RegisterForm />
      </div>
    </>

  )
}
