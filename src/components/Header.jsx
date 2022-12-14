import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";


function Header({log}) {
  const [user, setUser] = useState();
  useEffect( () => {
    setUser(log);
  }, [user]);
  return (
    <div>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="myflashcards">My flashcards</NavLink></li>
          <li><NavLink to="train">Train</NavLink></li>
          <li><NavLink to="signin">Sign In</NavLink></li>
          <li>{log}</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;