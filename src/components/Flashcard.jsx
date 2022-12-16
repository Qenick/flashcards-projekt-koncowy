import React, {useEffect, useState} from 'react';
import supabase from "../services/supabase.js";

function Flashcard({front, back, cardId, fetchFlashcards}) {

  const [cardFront, setCardFront] = useState(front);
  const [cardBack, setCardBack] = useState(back);
  const [toEdit, setToEdit] = useState(false);

  useEffect( ()=> {
    setCardFront(front);


  }, [front]);

  useEffect( ()=> {

    setCardBack(back);

  }, [back]);

  const handleEdit = (e) => {
    e.preventDefault();
    setToEdit(prevState => !prevState);

  }

  const handleCardChange =  async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('flashcards')
      .update({
        front: cardFront,
        back: cardBack
      })
      .eq('id', cardId)
    fetchFlashcards();
    setToEdit(prevState => !prevState);

  }

  const handleDelete = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', `${cardId}`)

    fetchFlashcards();
  }

  return (
    <div>
      {!toEdit && (<div>
        <p>{front}</p>
        <p>{back}</p>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>)}

      {toEdit &&
      (<div>
        <form>
          <br />
          <input type="text" value={cardFront} placeholder={front} onChange={ (e) => {
            e.preventDefault();
            setCardFront(e.target.value);
          }

          }/>
          <br />
          <input type="text" value={cardBack} placeholder={back} onChange={ (e) => {
            e.preventDefault();
            setCardBack(e.target.value);
          }
          }/>
        </form>
      <button onClick={handleCardChange}>Save changes</button>
      </div>)
      }
    </div>
  );
}

export default Flashcard;