import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import supabase from '../services/supabase';

import { useNavigate } from 'react-router-dom';


export default function LoginForm({setLog, setModal}) {

  const navigate = useNavigate();
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
      setLog(true);
      navigate('../myflashcards');
    }
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    setModal(false);
  }


  return (
    <div>
      <div>
        <h1>Signin</h1>
        <form onSubmit={singinUser}>
            <InputText placeholder="Email" />
            <Password toggleMask feedback={false} placeholder='Password' />
          <br />
            <Button type="submit" label="Signin" />
        </form>
        <br/>
        <Button onClick={handleOnClick}>First time user? Sign Up!</Button>
      </div>
    </div>
  )
}
