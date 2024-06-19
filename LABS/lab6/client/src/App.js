// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AdsWithDetails from './components/AdsWithDetails';
import AdsWithComments from './components/AdsWithComments';
import UsersWithStats from './components/UsersWithStats';
import CreateUser from './components/CreateUser';
import ReadUsers from './components/ReadUsers';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';

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
            <li>
              <Link to="/createUser">Create User</Link>
            </li>
            <li>
              <Link to="/readUsers">Read Users</Link>
            </li>
            <li>
              <Link to="/updateUser">Update User</Link>
            </li>
            <li>
              <Link to="/deleteUser">Delete User</Link>
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
          <Route path="/createUser">
            <CreateUser />
          </Route>
          <Route path="/readUsers">
            <ReadUsers />
          </Route>
          <Route path="/updateUser">
            <UpdateUser />
          </Route>
          <Route path="/deleteUser">
            <DeleteUser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;