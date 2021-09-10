import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function PlayerForm(props) {
  const { onSubmitProp, button } = props;
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [isvalid, setIsvalid] = useState(false);
  const [errors, setErrors] = useState({});
  let history = new useHistory();
  
  const handleChange = (evt) => {
    const err = {};
    const { value } = evt.target;
    setName(value);

    if (!value.trim()) {
      err.name = 'Name is required!';
    } else if (value.trim().length < 2) {
      err.name = 'Name must be at least 2 characters!';
    } else {
      err.name = '';
    }
    setErrors({...err});
    setIsvalid(Object.values(err).every(s => s === ''));
    // setIsvalid(!Object.values(err).some(s => s !== ''));
  };
  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    onSubmitProp({name: name.trim(), position:position});
    setName('');
    setPosition('');
  };

  return (
    <>
    <div>
      <form onSubmit={onSubmitHandler}>
        { props.errors.map((err, index) => <p className="error" key={index}>{err}</p>) }
        <label>Player Name</label>
        <input type="text" value={name} onChange={handleChange} />
        <p className="error">{ errors.name }</p>
        <label>Prefered Position</label>
        <select value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="">Please select position</option>
          <option>Forward</option>
          <option>Midfielder</option>
          <option>Goal Keeper</option>
        </select>
        <div id="button">
          <button type="submit" disabled={!isvalid}>{ button }</button>
        </div>
      </form>
    </div>
    </>
  );
};
