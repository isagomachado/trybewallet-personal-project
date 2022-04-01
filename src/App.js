import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Login { ...props } /> }
          />
          <Route
            path="/carteira"
            render={ (props) => <Wallet { ...props } /> }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
