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
            futureSpace: 1,
            nextTrainDate: toAdd.lastDone + (toAdd.futureSpace * 60000)

          },
        ]);

      if (!error) {

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
      <div className="main-container">
        <h1>My flashcards</h1>
        <p>You have done {allFlashcards.length} cards.</p>
        <div className="card">
          <form className="login-form" onSubmit={submit}>
            <h2>Create new flashcard</h2>
            <textarea className="card-content, input-edit" cols="40" id="front" value={formInput.front} placeholder="Enter front fo the card" onChange={(e) => {
              setFormInput(prevState => ({
                ...prevState,
                front: e.target.value

              }))
            }}/>

            <textarea className="card-content, input-edit" cols="40" id="back" value={formInput.back} placeholder="Enter back of the card" onChange={(e) => {
              setFormInput(prevState => ({
                ...prevState,
                back: e.target.value
              }))
            }}/>

            <button className="button-navy" type="submit">Save card</button>
          </form>
        </div>
            <div>

              {allFlashcards.map((el) => <Flashcard key={el.id} cardId={el.id} front={el.front} back={el.back} fetchFlashcards={fetchFlashcards}/>)}
            </div>

      </div>
    );
  }
}

export default MyFlashcards;