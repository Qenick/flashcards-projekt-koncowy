import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Home from "./views/Home.jsx";
import MyFlashcards from "./views/MyFlashcards.jsx";
import Train from "./views/Train.jsx";
import SignIn from "./views/SignIn.jsx";
import reactLogo from './assets/react.svg'
import './App.css'
import {useState} from "react";

function App() {

  const [log, setLog] = useState("");

  return (
    <Router>
      <Header log={log}/>
      <Routes>
        <Route path="/"  element={< Home/>}/>
        <Route path="myflashcards"  element={< MyFlashcards/>}/>
        <Route path="train"  element={< Train/>}/>
        <Route path="signin"  element={< SignIn setLog={setLog}/>} />

      </Routes>
    </Router>
  )
}

export default App
