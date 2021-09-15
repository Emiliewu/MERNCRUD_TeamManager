import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

export default function Button (props) {
  const {player} = props;
  const game = player.game;
  const {gameId} = useParams();
  const stat = game[gameId-1];
  const [status, setStatus] = useState(stat);
  
  useEffect(() => {
    setStatus(stat);
  }, [stat]);



  const handleClick = (val) => () => {
    game[+gameId-1] = val;
    axios.put(`http://localhost:8000/api/player/${player._id}/status`, {game})
      .then(res => {
        setStatus(val);
      })
      .catch(console.log);
  };

  return (
    <>
      <button className={status === 1 ? 'green' : ''} onClick={handleClick(1)}>Playing</button>
      <button className={status === -1 ? 'red' : ''} onClick={handleClick(-1)}>Not Playing</button>
      <button className={status === 0 ? 'yellow' : ''} onClick={handleClick(0)}>Undecided</button>
    </>
  );
}