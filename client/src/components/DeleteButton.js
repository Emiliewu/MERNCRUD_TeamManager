import React from 'react';
import axios from 'axios';

export default function DeleteButton(props) {
    const { id, playersObj, successCallback } = props;
    const handleDelete = (evt) => {
      if (!window.confirm(`Are you sure you want to delete ${playersObj[id].name}?`)) {
        return evt.preventDefault();
      }
      axios.delete('http://localhost:8000/api/player/'+id)
        .then( _ => successCallback())
        .catch(err => console.log(err));
    }
    return <button id="delBtn" onClick={handleDelete}>Delete</button>;
};