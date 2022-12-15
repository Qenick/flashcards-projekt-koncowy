import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header.jsx";
import Home from "./views/Home.jsx";
import MyFlashcards from "./views/MyFlashcards.jsx";
import Train from "./views/Train.jsx";
import SignIn from "./views/SignIn.jsx";
import reactLogo from './assets/react.svg'
import './App.css'
import {useState, useEffect} from "react";
import supabase from "./services/supabase.js";

function App() {

  const [isLogged, setIsLogged] = useState(null);
  // const [userId, setUserId] = useState(null);


  useEffect(() => {

    const isUserLogged = async() => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsLogged(false)
        return;
      }

      setIsLogged(true);
      console.log("is logged? : ", isLogged);


    }

    isUserLogged();

  }, [isLogged]);


  return (
    <Router>
      <Header isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Routes>
        <Route path="/"  element={< Home/>}/>
        <Route path="myflashcards"  element={< MyFlashcards isLogged={isLogged}/>}/>
        <Route path="train"  element={< Train isLogged={isLogged}/>}/>
        <Route path="signin"  element={< SignIn setIsLoggedProp={setIsLogged}/>} />

      </Routes>
    </Router>
  )
}

export default App
