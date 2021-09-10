import React, {useState} from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import PlayerForm from '../components/PlayerForm';

export default function Create() {
  const [errors, setErrors] = useState([]);
  let history = useHistory();

  const createPlayer = (player) => {
    axios.post('http://localhost:8000/api/players', player)
      .then(() => history.push('/players/list'))
      .catch(err => {
        const errorArr = Object.values(err.response.data.errors);
        setErrors(errorArr.map(err => err.message));
    });
  };
  
  return (
    <div id="createPlayer">
      <h3><Link to="/players/list">List</Link>&nbsp; | &nbsp;<Link to="/players/addplayer">Add Player</Link></h3>
      <h4>Add Player</h4>
      <PlayerForm 
        onSubmitProp={createPlayer} 
        errors={errors}
        button="Add" />
    </div>
  );
}

