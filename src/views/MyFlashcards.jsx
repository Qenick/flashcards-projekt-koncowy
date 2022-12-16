import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import supabase from "../services/supabase.js";
import Flashcard from "../components/Flashcard.jsx";

function MyFlashcards({isLogged, userId, flashcards, fetchFlashcards}) {
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
    !isLog ? navigate('../signin') : null;

  }, [isLog]);

  useEffect( () => {
    setAllFlashcards(flashcards);
  }, [flashcards]);

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
          return 1;
          break;

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

    console.log(toAdd);

    const saveFlashcard = async () => {
      const { data, error } = await supabase
        .from('flashcards')
        .insert([
          {
            user: userId,
            front: toAdd.front,
            back: toAdd.back,
            creationDate: toAdd.creationDate,
            lastDone: toAdd.lastDone,
            lastSpace: 0,
            futureSpace: 1

          },
        ]);

      if (!error) {
        // toast.current.show({severity: 'success', summary: 'Success', detail: 'Code snippet saved successfully!'});
        fetchFlashcards();
      }
    }

    saveFlashcard();



    setFormInput({
      front: "",
      back: ""
    });
  }

//bez poniższego if na milisekundę pokazywała się terść niedostępna ??
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
            <br />
            <input type="text" id="back" value={formInput.back} onChange={(e) => {
              setFormInput(prevState => ({
                ...prevState,
                back: e.target.value
              }))
            }}/>
            <br />
            <button type="submit">Submit</button>
          </form>
            <div>

              {allFlashcards.map((el) => <Flashcard key={el.id} cardId={el.id} front={el.front} back={el.back} fetchFlashcards={fetchFlashcards}/>)}
            </div>
        </div>
      </div>
    );
  }
}

export default MyFlashcards;