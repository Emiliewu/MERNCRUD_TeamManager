
import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Game from '../components/Game';

export default function Status(props) {
  const { gameId } = useParams();
  const [players, setPlayers] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost:8000/api/players')
    .then(res => setPlayers(res.data))
    .catch(err => console.log(err));    
  }, [reload]);

  const handleClick = ()=>{
    setReload(!reload);
  }

  return (
    <div id="game">
      <h3>Player Status Game {gameId}</h3>
      <h4>
       
        <Link to="/status/game/1" onClick={handleClick}>Game 1</Link>&nbsp; | &nbsp;
        <Link to="/status/game/2" onClick={handleClick}>Game 2</Link>&nbsp; | &nbsp;
        <Link to="/status/game/3" onClick={handleClick}>Game 3</Link>

      
      </h4>
      <Game players={players} />
    </div>
  );

}