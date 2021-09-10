import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';

export default function Game(props) {
  const {players} = props;
  const {gameId} = useParams();
  return (
    <>
    <table>
    <thead>
      <tr>
        <th>Player Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    { players.map((player) => 
        <tr key={player._id}>
          <td>{ player.name }</td>
          <td>
            <Button player={player} gameId={gameId} />
          </td>
        </tr>)
    }
    </tbody>
  </table>
  </>
  );
}
