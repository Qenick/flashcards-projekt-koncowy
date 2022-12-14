import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

// import illustration from '../assets/website-development.svg';

import supabase from '../services/supabase';

import { useNavigate } from 'react-router-dom';
import {useState} from "react";

export default function LoginForm({setLog}) {


  const navigate = useNavigate();

  const [userId, setUserId] = useState({});
  const singinUser = async (e) => {
    e.preventDefault();

    const [ email, password ] = e.target.elements;

    let { data: { user, error }} = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });



    if (error) {
      console.log("Error przy logowaniu")
      return;
    }

    if (!error) {
      localStorage.setItem('userData', JSON.stringify(user));

      navigate('../myflashcards');
    }
  }

  const handleOnClick = () => {
    setLog("logged");
  }
  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <h1><i className="pi pi-lock"></i> Signin</h1>
        <form onSubmit={(e) => singinUser(e)} className='signin-form'>
          {/* Email */}
          <span className="p-input-icon-left">
            <i className="pi pi-user" />
            <InputText placeholder="Email" />
          </span>
          <span className="p-input-icon-left">
            <i className="pi pi-lock" />
            <Password toggleMask feedback={false} placeholder='Password' />
          </span>
          <br />
          <span>
            <Button label="Signin" />
            <br />
            <Button onClick={() => navigate('/signup')} label="Create account" className="p-button-link" />
          </span>
        </form>
        <Button onClick={ (e) => {
          e.preventDefault();
          handleOnClick()}}>Klik</Button>
      </div>
    </div>
  )
}
