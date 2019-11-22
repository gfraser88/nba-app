import React from 'react';
import NavBar from './components/Navbar';
import TeamData from './components/TeamData';
import RosterData from './components/RosterData';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';




function App() {
  
  return (
    <div>
      <NavBar/>
      <Router>
        <Switch>
          <Route exact path="/">
            <TeamData></TeamData>
          </Route>
          <Route path="/:team">
            <RosterData />
          </Route>
        </Switch>
        </Router>      
    </div>
  );
}

export default App;
