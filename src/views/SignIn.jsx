import React, {useState} from 'react';
import LoginForm from "../components/LoginForm.jsx";
import SignUpForm from "../components/SignUpForm";

function SignIn({setIsLoggedProp}) {
  const [modal, setModal] = useState(true);

  return (
    <div className="main-container">
      { modal ? <LoginForm setModal={setModal} setLog={setIsLoggedProp}/> :  <SignUpForm setModal={setModal}/> }

    </div>
  );
}

export default SignIn;