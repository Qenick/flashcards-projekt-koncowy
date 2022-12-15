import React, {useEffect, useState} from 'react';

function Flashcard({front, back, cardId}) {

  const [cardFront, setCardFront] = useState(front);
  const [cardBack, setCardBack] = useState(back);
  const [toEdit, setToEdit] = useState(false);

  useEffect( ()=> {
    setCardFront(front);


  }, [front]);

  useEffect( ()=> {

    setCardBack(back);

  }, [back]);

  const onChange = (e) => {
    e.preventDefault();

  }


  return (
    <div>
      <p>{front}</p>
      <p>{back}</p>


      <form>
        <input type="text" value={cardFront} placeholder={front} onChange={ (e) => {
          e.preventDefault();
          setCardFront(e.target.value);
        }

        }/>
        <input type="text" value={cardBack} placeholder={back} onChange={ (e) => {
          e.preventDefault();
          setCardBack(e.target.value);
        }

        }/>
      </form>
    </div>
  );
}

export default Flashcard;