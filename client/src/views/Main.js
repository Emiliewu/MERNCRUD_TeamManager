import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import PlayerList from '../components/PlayerList';

export default function Main() {
  const [players, setPlayers] = useState([]);
  const [Cached, setCached] = useState([]);
  const [playersObj, setPlayersObj] = useState({});
  const [loaded, setLoaded] = useState(false);
  const arrayToObj = (acc, obj) => ({...acc, [obj._id]: obj});

  useEffect(()=>{
    axios.get('http://localhost:8000/api/players')
    .then(res => {
      const obj = res.data.reduce(arrayToObj, {});
      //playersObj now holds { _id: {the player obj} }
      setPlayersObj(obj);
      //players now is holding a list of id
      setPlayers(Object.keys(obj));
      setCached(Object.keys(obj));
      // setPlayers(res.data);
      // setCached(res.data);
      setLoaded(true);
    })
    .catch(err => console.log(err));    
  }, []);

  const handleSearch = (ev) => {
    const search = ev.target.value.trim();
    setPlayers(Cached.filter(id => playersObj[id].name.toLowerCase().includes(search)));
    // setPlayers(Cached.filter(player => player.name.toLowerCase().includes(search)));
  };
  const handleFilter = (ev) => {
    const p = ev.target.value;
    setPlayers(Cached.filter(id => playersObj[id].position.includes(p)));
    // setPlayers(Cached.filter(player => player.position.includes(p)));
  }

  const removeFromDom = (id) => {
    // setPlayers(players.filter(player => player._id !== id));
    setPlayers(players.filter(_id => _id !== id));
    delete playersObj[id];
    setPlayersObj({...playersObj});
    setCached(Object.keys(playersObj));
  };

  return(
    <div id="main">
      <div>
        <h3><Link to="/players/list">List</Link>&nbsp; | &nbsp;<Link to="/players/addplayer"> Add Player</Link></h3>
        <select id="filter" onChange={handleFilter}>
          <option value="">Please select position</option>
          <option value="Forward">Forward</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Goal Keeper">Goal Keeper</option>
        </select>
        <TextField
          id="search"
          label="Search by name" 
          variant="standard"
          autoComplete="off"
          spellCheck="false"
          InputProps={{
            endAdornment: 
              <InputAdornment>
                <Icon color="primary">search</Icon>
              </InputAdornment>
          }}
          onChange={handleSearch}
        />
      </div>
      {loaded && <PlayerList players={players} setPlayers={setPlayers} setCached={setCached} playersObj={playersObj} setPlayersObj={setPlayersObj} removeFromDom={removeFromDom} />}
    </div>
  );
}