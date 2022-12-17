import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import supabase from '../services/supabase';

import { useNavigate } from 'react-router-dom';
import {useState} from "react";


export default function LoginForm({setLog, setModal}) {

  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();
  const singinUser = async (e) => {
    e.preventDefault();

    const [ email, password ] = e.target.elements;

    let { data: { user, error }} = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });



    if (error) {
      console.log("Error przy logowaniu");

      return;
    }

    if (!error) {
      localStorage.setItem('userData', JSON.stringify(user));
      setLog(true);
      navigate('../myflashcards');
    }
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    setModal(false);

  }


  return (
    <div >
      <div className="card">
        <div>
          <h1>Signin</h1>
          <form onSubmit={singinUser} className="login-form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder='Password' />

            <button type="submit" className="button-navy">Sign - in</button>
          </form>
          <br/>
          <button className="button-in-form" onClick={handleOnClick}>First time user? Sign Up!</button>

        </div>

      </div>
    </div>
  )
}
