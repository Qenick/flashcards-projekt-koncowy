import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import supabase from "../services/supabase.js";
import {useNavigate} from "react-router-dom";


function Header({isLogged, setIsLogged}) {
  const [isLogIn, setIsLogIn] = useState(isLogged);
  // useEffect( () => {
  //   setUser(log);
  // }, []);

  // const logoutUser = async (e) => {
  //   e.preventDefault();
  //   let { error } = await supabase.auth.signOut();
  //
  //   if (!error) {
  //     localStorage.removeItem('userData');
  //     useNavigate('.../');
  //   }
  // }

  const logout = (e) => {
    e.preventDefault();
    setIsLogged(false);
    localStorage.clear();

  }
  return (
    <div>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="myflashcards">My flashcards</NavLink></li>
          <li><NavLink to="train">Train</NavLink></li>
          <li>
            {isLogged ? <button onClick={ (e) => logout(e)}>Logout</button> : <NavLink to="signin">Sign In</NavLink> }
          </li>

        </ul>
      </nav>
    </div>
  );
}

export default Header;