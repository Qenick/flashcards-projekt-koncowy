import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Home from "./views/Home.jsx";
import MyFlashcards from "./views/MyFlashcards.jsx";
import Train from "./views/Train.jsx";
import Login from "./views/Login.jsx";
import reactLogo from './assets/react.svg'
import './App.css'

function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/"  element={< Home/>}/>
        <Route path="/myflashcards"  element={< MyFlashcards/>}/>
        <Route path="/train"  element={< Train/>}/>
        <Route path="/login"  element={< Login/>}/>

      </Routes>
    </Router>
  )
}

export default App
