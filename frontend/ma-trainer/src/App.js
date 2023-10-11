import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './components/Login';
import UserPage from './components/UserPage';
import ToolbarComponent from './components/Toolbar';
import './App.css';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false); // State to track user login status

  return (
    <Router>
      <ToolbarComponent userLoggedIn={userLoggedIn} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" component={Signup} />
        <Route
          path="/login"
          render={(props) => <Login {...props} setUserLoggedIn={setUserLoggedIn} />}
        />
        <Route path="/user" component={UserPage} />
      </Switch>
    </Router>
  );
}

export default App;