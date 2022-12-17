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
    <div className="card">
      {!toEdit && (
        <div>
          <div className="card-content">
            <p>Front side:</p>
            <p>{front}</p>
          </div>
          <div className="card-content-back">
            <p>Back side:</p>
            <p>{back}</p>
          </div>
          <button className="button-navy" onClick={handleEdit}>Edit</button>
          <button className="button-navy" onClick={handleDelete}>Delete</button>
        </div>)}

      {toEdit &&
      (<div>
        <form>
          <br />
          <input className="card-content, input-edit" type="text" value={cardFront} placeholder={front} onChange={ (e) => {
            e.preventDefault();
            setCardFront(e.target.value);
          }

          }/>
          <br />
          <input className="card-content-back, input-edit" type="text" value={cardBack} placeholder={back} onChange={ (e) => {
            e.preventDefault();
            setCardBack(e.target.value);
          }
          }/>
        </form>
      <button className="button-navy" onClick={handleCardChange}>Save changes</button>
      </div>)
      }
    </div>
  );
}

export default Flashcard;