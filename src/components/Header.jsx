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
  const nagivate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    setIsLogged(false);
    localStorage.clear();
    nagivate('./')
  }
  return (
    <div className="nav-container">
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="myflashcards">My flashcards</NavLink></li>
          <li><NavLink to="train">Train</NavLink></li>

          {isLogged ? <button className="button-navy" onClick={ (e) => logout(e)}>Logout</button> : <NavLink className="button-navy" to="signin">Sign In</NavLink> }


        </ul>
      </nav>
    </div>
  );
}

export default Header;