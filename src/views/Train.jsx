import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";



function Train({isLogged, flashcards, userId}) {

  const [isLog, setIsLog] = useState(isLogged);
  const [cardsToTrain, setCardsToTrain] = useState();
  const navigate = useNavigate();


  useEffect( () => {
    !isLog ? navigate('../signin') : null
  }, [isLogged])

  useEffect( () => {
    const date = new Date();
    const miliDate = date.getTime();
    const filteredFlashcards = flashcards.filter( el => {
      if (el.nextTrainDate) {
        return el.nextTrainDate <= miliDate;
      }


    })
    console.log("miliDate", miliDate);
    console.log("flashcards", flashcards);
    console.log("filtered flashcards", filteredFlashcards);
    setCardsToTrain(filteredFlashcards);
  }, [flashcards])

  if (isLog) {
    return (
      <div>
        <h1>Train</h1>
        <ul>
        {/*{ cardsToTrain.map(el => (<li key={el.id}>{el.front}</li>)) }*/}
        </ul>
      </div>
    );
  }



}

export default Train;