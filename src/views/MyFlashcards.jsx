import React, {useState} from 'react';

function MyFlashcards() {
  const [allFlashcards, setAllFlashcards] = useState([]);
  const [formInput, setFormInput] = useState({
    front: "",
    back: "",
    creationDate: "",
    lastDone: "",
    lastSpace: "",
    futureSpace: ""
  });

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
    setAllFlashcards(prev => [toAdd, ...prev]);
    console.log(toAdd);
    setFormInput({
      front: "",
      back: ""
    });
  }


  return (
    <div>
      <h1>My flashcards</h1>
      <form onSubmit={submit}>
        <input type="text" id="front" value={formInput.front} onChange={() => {
          setFormInput(prevState => ({
            ...prevState,
              front: event.target.value
          }))
        }}/>
        <input type="text" id="back" value={formInput.back} onChange={() => {
          setFormInput(prevState => ({
            ...prevState,
            back: event.target.value
          }))
        }}/>
        <button type="submit">Submit</button>
        <div>
          {allFlashcards.map((el, i) => <div key={i}><p>{el.front}</p><p>{el.back}</p></div>)}
        </div>
      </form>

    </div>
  );
}

export default MyFlashcards;