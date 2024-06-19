import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Users from './components/Users';
import Categories from './components/Categories';
import Ads from './components/Ads';
import Comments from './components/Comments';
import Tags from './components/Tags';
import AddUser from './components/AddUser';
import AdsListWithDetails from './components/AdsListWithDetails';
import AdsByPrice from './components/AdsByPrice';
import AdCountByCategory from './components/AdCountByCategory';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/ads">Ads</Link></li>
            <li><Link to="/comments">Comments</Link></li>
            <li><Link to="/tags">Tags</Link></li>
            <li><Link to="/add-user">Add User</Link></li>
            <li><Link to="/ads-with-details">Ads with Details</Link></li>
            <li><Link to="/ads-by-price">Ads by Price</Link></li>
            <li><Link to="/ad-count-by-category">Ad Count by Category</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/categories" component={Categories} />
          <Route path="/ads" component={Ads} />
          <Route path="/comments" component={Comments} />
          <Route path="/tags" component={Tags} />
          <Route path="/add-user" component={AddUser} />
          <Route path="/ads-with-details" component={AdsListWithDetails} />
          <Route path="/ads-by-price" component={AdsByPrice} />
          <Route path="/ad-count-by-category" component={AdCountByCategory} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
