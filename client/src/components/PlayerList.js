import React from 'react';
import axios from 'axios';
import DeleteButton from './DeleteButton';

export default function PlayerList(props) {
  // const {players, removeFromDom} = props;
  const {players, setPlayers, setCached, playersObj, setPlayersObj, removeFromDom} = props;

  const handleClick = (id, f) => {
    if (playersObj[id].likes === 0 && f === -1) {
      return;
    }
    axios.put(`http://localhost:8000/api/player/${id}/likes`, {inc: f})
      .then(res => {
        let newObj;
        setPlayersObj(pObj => {
          newObj = {...pObj, [id]: res.data};
          return newObj;
        });
        setPlayers(pArr => [...pArr.sort((a, b) => newObj[b].likes - newObj[a].likes)]);
        setCached(pArr => [...pArr.sort((a, b) => newObj[b].likes - newObj[a].likes)]);
        // const newArr = players.slice();
        // for (let p of newArr) {
        //   if (id === p._id) {
        //     p.likes += f;
        //     break;
        //   }
        // }
        // setPlayers(newArr);

      })
      .catch(err => console.log(err));   
  };

  return(
    <table>
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Position</th>
          <th className="likes">likes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {/* { players.map(({_id, name, position}) =>  */}
      { players.map(_id => 
        <tr key={_id}>
          <td>{ playersObj[_id].name }</td>
          <td>{ playersObj[_id].position }</td>
          <td className="likes">
            <button onClick={()=>handleClick(_id, -1)}>-</button>
            &nbsp;{ playersObj[_id].likes }&nbsp; 
            <button onClick={()=>handleClick(_id, 1)}>+</button>
          </td>
          <td>
            <DeleteButton id={_id} playersObj={playersObj} successCallback={() => removeFromDom(_id)} />
          </td>
        </tr>)
      }
      </tbody>
    </table>
  );
}