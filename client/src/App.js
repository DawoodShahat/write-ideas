import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import Track from './components/Track';
import CustomizeEditor from './components/CustomizeEditor';
import { UserAuthProvider } from './components/UserAuthProvider';


function App(props) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => {
        if (result.redirectionUrl === '/') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
  }, [])

  const _isAuthenticated = (isAuth) => {
    setIsAuthenticated(isAuth);
  }


  return (
    <UserAuthProvider value={{ isAuthenticated, _isAuthenticated }}>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => isAuthenticated ? <Redirect exact to="/" /> : <LandingPage />} />
          <Route exact path="/signup" render={() => isAuthenticated ? <Redirect exact to="/" /> : <SignUp />} />
          <Route exact path="/" render={() => isAuthenticated ? <HomePage /> : <Redirect exact to="/login" />} />
          <Route exact path="/track" render={() => isAuthenticated ? <Track /> : <Redirect exact to="/login" />} />
          <Route exact path="/customize" render={() => isAuthenticated ? <CustomizeEditor /> : <Redirect exact to="/login" />} />

        </Switch>
      </Router>
    </UserAuthProvider>
  );
}

export default App;
