import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import supabase from '../services/supabase';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm({setModal}) {
  const navigate = useNavigate();

  const errorToast = useRef(null);

  const signupUser = async (e) => {
    e.preventDefault();

    const [ email, password, repassword ] = e.target.elements;

    if (password.value !== repassword.value) {
      return;
    }

    // Supabase cheating
    let { data: { user, error }} = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      return;
    }

    navigate('');
  }

  const onClick = (e) => {
    e.preventDefault()
    setModal(true);
  }

  return (
    <div className="card">
      <div className="">
        <h1>Signup</h1>
        <form className="login-form" onSubmit={signupUser}>


            <input type="email" id="email" placeholder="Email" />



            <input type="password" placeholder='Password' />



            <input type="password"  placeholder='Re-enter password' />


          <button type="submit" className="button-navy"> Signup</button>

        </form>
        <button className="button-in-form" onClick={onClick}> Already have an account?</button>
      </div>
    </div>
  )
}