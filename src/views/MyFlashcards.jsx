import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

function MyFlashcards({isLogged}) {
  const [allFlashcards, setAllFlashcards] = useState([]);
  const [formInput, setFormInput] = useState({
    front: "",
    back: "",
    creationDate: "",
    lastDone: "",
    lastSpace: "",
    futureSpace: ""
  });

  const [isLog, setIsLog] = useState(isLogged);
  const navigate = useNavigate();


  useEffect( () => {
    !isLog ? navigate('../signin') : null
  }, [isLog]);

  const submit = (e) => {
    e.preventDefault()
    const date = new Date( );
    const timePassed = date.getTime();

    const futureSpaceCalc = (lastSpace) => {
      switch (lastSpace) {
        case 0:
          return 1;
          break;
        case 1:
          return 3;
          break;
        case 3:
          return 7;
          break;
        case 7:
          return 14;
          break;
          case 14:
            return 31;
            break;
            case 31:
            return 62;
            break;
        case 62:
          return 62;
          break;
        default:
          return 1
      }
    }
    console.log(futureSpaceCalc(3));
    const toAdd = {
      front: e.target.elements.front.value,
      back: e.target.elements.back.value,
      creationDate: timePassed,
      lastDone: timePassed,
      lastSpace: 0,
      futureSpace: 1
    }
    setAllFlashcards(prev => [toAdd, ...prev]);
    console.log(toAdd);
    setFormInput({
      front: "",
      back: ""
    });
  }


  if (isLogged) {
    return (
      <div>
        <h1>My flashcards</h1>
        <div>
          <form onSubmit={submit}>
            <input type="text" id="front" value={formInput.front} onChange={(e) => {
              setFormInput(prevState => ({
                ...prevState,
                front: e.target.value
              }))
            }}/>
            <input type="text" id="back" value={formInput.back} onChange={(e) => {
              setFormInput(prevState => ({
                ...prevState,
                back: e.target.value
              }))
            }}/>
            <button type="submit">Submit</button>
            <div>
              <></>
              {allFlashcards.map((el, i) => <div key={i}><p>{el.front}</p><p>{el.back}</p></div>)}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MyFlashcards;