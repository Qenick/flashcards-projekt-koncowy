import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import supabase from "../services/supabase.js";



function Train({isLogged, flashcards, userId}) {

  const [isLog, setIsLog] = useState(isLogged);
  const [cardsToTrain, setCardsToTrain] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [points, setPoints] = useState(0);
  const [fails, setFails] = useState(0);
  const [goodInfo, setGoodInfo] = useState(false);
  const [badInfo, setBadInfo] = useState(false);
  const [lastAnswer, setLastAnswer] = useState()

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
  }, [flashcards]);



  const onChange = (e) => {
    e.preventDefault();
    setAnswerInput(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Odpowiedź: ", answerInput);

    const date = new Date();
    const milDate = date.getTime();
    console.log("ilość kart: ", cardsToTrain.length);

    if (cardsToTrain[currentCard].back === answerInput) {
      console.log("success");

      const futureSpaceCalc = (lastSpace) => {
        switch (lastSpace) {
          case 0:
            return 1;
          case 1:
            return 3;
          case 3:
            return 7;
          case 7:
            return 14;
          case 14:
            return 31;
          case 31:
            return 62;
          case 62:
            return 62;
          default:
            return 1;
        }
      }

      const { error } = await supabase
        .from('flashcards')
        .update({
          lastSpace: cardsToTrain[currentCard].futureSpace,
          futureSpace: futureSpaceCalc(cardsToTrain[currentCard].futureSpace),
          lastDone: milDate,
          nextTrainDate: milDate + (cardsToTrain[currentCard].futureSpace * 60000)
        })
        .eq('id', cardsToTrain[currentCard].id);

      setPoints(prevState => prevState + 1);
      setGoodInfo(true);

    } else {
      console.log("Fail");
      const { error } = await supabase
        .from('flashcards')
        .update({
          lastDone: milDate,
          nextTrainDate: milDate + (cardsToTrain[currentCard].futureSpace * 60000)
        })
        .eq('id', cardsToTrain[currentCard].id);

      setCardsToTrain(prevState => [...prevState, cardsToTrain[currentCard]]);
      setFails(prevState => prevState +1);
      setBadInfo(true);
      setLastAnswer(answerInput);


    }

    setCurrentCard(prevState => prevState + 1);
    setAnswerInput("");
  }


  const handleNext = (e) => {
    e.preventDefault();
    setGoodInfo(false);
    setBadInfo(false);
  }


  //przycisk start
  //ilość błędów

  if (cardsToTrain.length === 0) {
   return (
     <div>
      <h1>Good job</h1>
      <p>No flashcard to repeat today</p>
    </div>
   )
  }

  if (goodInfo) {
    return (
      <div>
        <form onSubmit={handleNext}>
          <h1>Good answer</h1>
          <p>It was {currentCard} from {cardsToTrain.length} </p>
          <button type={"submit"}>Next card</button>
        </form>
      </div>
    )
  }

  if (badInfo) {
    return (
      <div>
        <form onSubmit={handleNext}>
          <h1>Bad answer</h1>
          <p>
            Question from Front: {cardsToTrain[currentCard - 1].front}
          </p>
          <p>
            Correct answer: {cardsToTrain[currentCard - 1].back}
          </p>
          <p>
            Your answer: {lastAnswer}
          </p>
          <button type={"submit"}>Next card</button>
        </form>
      </div>
    )
  }

  if (isLog && cardsToTrain.length > 0) {

    if (currentCard >= cardsToTrain.length) {
      return (
        <div>
          <h2>Statistics</h2>
          <p>Correct answers: {points}</p>
        </div>
      )
    }
    return (
      <div>
        <h1>Train</h1>
        <div>
          <p>
            {cardsToTrain[currentCard].front}
          </p>
          <form onSubmit={onSubmit}>
            {/*<input type="textarea" rows={5} cols={20} placeholder="Enter answer" value={answerInput} size="20" onChange={onChange}/>*/}
            <input placeholder="Enter answer" value={answerInput} size={20} onChange={onChange}/>
            <br />
            <button type="submit">Submit answer</button>
          </form>
        </div>
      </div>
    );
  }



}

export default Train;