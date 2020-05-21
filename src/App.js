import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Stock from './containers/Stock'
import Note from './containers/Note';

class App extends React.Component {
  render() {
    return (<>
      <Router>
        <Switch>
          <Route path="/stock">
            <Stock />
          </Route>
          <Route path="/note">
            <Note />
          </Route>
          <Route path="/">
            <nav className="App-nav">
              <ul>
                <li>
                  <Link to="/stock">Stock</Link>
                </li>
                <li>
                  <Link to="/note">Note</Link>
                </li>

              </ul>
            </nav>
          </Route>
        </Switch>
      </Router>
      <h1>Pusher Test</h1>
      <p>
        Try publishing an event to channel <code>my-channel</code>
        with event name <code>my-event</code>.
      </p>
    </>
    );
  }
}

export default App;
