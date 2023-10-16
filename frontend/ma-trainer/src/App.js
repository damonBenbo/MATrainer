import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './components/Login'; // Import the Login component
import ToolbarComponent from './components/Toolbar';
import UserPage from './pages/UserPage'; // Import UserPage

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  return (
    <Router>
      <ToolbarComponent userLoggedIn={userLoggedIn}/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" component={Signup} />
        <Route path="/login" >
          <Login onLogin={handleLogin} />
        </Route>
        <Route
          path={`/user/:username`}
          component={UserPage}
        />
      </Switch>
    </Router>
  );
}

export default App;