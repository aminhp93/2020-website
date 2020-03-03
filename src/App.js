import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Stock from './containers/Stock/Stock'
import TodoMVC from './containers/TodoMVC/TodoMVC';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/stock">Stock</Link>
              </li>
              <li>
                <Link to="/todos">Todos</Link>
              </li>

            </ul>
          </nav>
          <Switch>
            <Route path="/stock">
              <Stock />
            </Route>
            <Route path="/todos">
              <TodoMVC />
            </Route>
            <Route path="/">
              <div>Hello Amin</div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
