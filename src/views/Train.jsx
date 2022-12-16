import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";



function Train({isLogged}) {

  const [isLog, setIsLog] = useState(isLogged);
  const navigate = useNavigate();


  useEffect( () => {
    !isLog ? navigate('../signin') : null
  }, [isLogged])

  if (isLog) {
    return (
      <div>Train</div>
    );
  }



}

export default Train;