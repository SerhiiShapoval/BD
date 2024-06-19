// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AdsWithDetails from './components/AdsWithDetails';
import AdsWithComments from './components/AdsWithComments';
import UsersWithStats from './components/UsersWithStats';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/adsWithDetails">Ads with Details</Link>
            </li>
            <li>
              <Link to="/adsWithComments">Ads with Comments</Link>
            </li>
            <li>
              <Link to="/usersWithStats">Users with Stats</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/adsWithDetails">
            <AdsWithDetails />
          </Route>
          <Route path="/adsWithComments">
            <AdsWithComments />
          </Route>
          <Route path="/usersWithStats">
            <UsersWithStats />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;