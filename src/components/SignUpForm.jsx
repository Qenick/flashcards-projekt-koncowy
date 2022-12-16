import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
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

  const onClick = () => {
    setModal(true);
  }

  return (
    <div className="signin-container">
      <Toast ref={errorToast} />
      <div className="signin-form-container">
        <h1><i className="pi pi-user"></i> Signup</h1>
        <form onSubmit={(e) => signupUser(e)} className='signin-form'>
          {/* Email */}
          <span className="p-input-icon-left">
            <i className="pi pi-user" />
            <InputText placeholder="Email" />
          </span>
          <span className="p-input-icon-left">
            <i className="pi pi-lock" />
            <Password toggleMask feedback={false} placeholder='Password' />
          </span>
          <span className="p-input-icon-left">
            <i className="pi pi-lock" />
            <Password toggleMask feedback={false} placeholder='Re-enter password' />
          </span>
          <br />
          <span>
            <Button label="Signup" />
            <br />

          </span>

        </form>
        <Button onClick={(e) => onClick(e)
        } label="Already have an account?" className="p-button-link" />
      </div>
    </div>
  )
}