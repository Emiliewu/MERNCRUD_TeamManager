import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Main from './views/Main';
import Create from './views/Create';
import Status from './views/Status'
import './App.css';

function App() {


  return (
    <div>
      <nav>
        <Link to="/players/list">Manage Players</Link>&nbsp; | &nbsp;<Link to="/status/game/1">Manage Player Status</Link>
      </nav>
      <div>
        <Switch>
          <Route exact path='/players/list'>
            <Main />
          </Route>
          <Route exact path='/players/addplayer'>
            <Create />
          </Route>
          <Route path='/status/game/:gameId'>
            <Status />
          </Route>
          <Redirect from='/' to='/players/list' />
        </Switch>
      </div>
    </div>
  );
}

export default App;
