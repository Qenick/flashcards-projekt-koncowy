import React from 'react';
import LoginForm from "../components/LoginForm.jsx";
import SignUpForm from "../components/SignUpForm";

function SignIn({setLog}) {
  return (
    <div>
      <LoginForm setLog={setLog}/>
      <SignUpForm/>
    </div>
  );
}

export default SignIn;