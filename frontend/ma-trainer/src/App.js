import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './components/Login'; // Import the Login component
import ToolbarComponent from './components/Toolbar';
import UserPage from './pages/UserPage'; // Import UserPage
import ListDetail from './pages/ListDetail';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setUserLoggedIn(true);
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
        <Route path="/:username/list/:listId" component={ListDetail}/>
      </Switch>
    </Router>
  );
}

export default App;