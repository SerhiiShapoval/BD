import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Users from './components/Users';
import Categories from './components/Categories';
import Ads from './components/Ads';
import Comments from './components/Comments';
import Tags from './components/Tags';
import AddOrDeleteUser from './components/AddOrDeleteUser';
import AddOrDeleteCategory from './components/AddOrDeleteCategory';
import AddOrDeleteAd from './components/AddOrDeleteAd';
import AddOrDeleteComment from './components/AddOrDeleteComment';
import AddOrDeleteTag from './components/AddOrDeleteTag';
import AdsListWithDetails from './components/AdsListWithDetails';
import AdsByPrice from './components/AdsByPrice';
import AdCountByCategory from './components/AdCountByCategory';

import UpdateUser from './components/updates/UpdateUser'; // Додано компонент оновлення оголошення
import UpdateCategory from './components/updates/UpdateCategory'; // Додано компонент оновлення оголошення
import UpdateAd from './components/updates/UpdateAd'; // Додано компонент оновлення оголошення
import UpdateComment from './components/updates/UpdateComment'; // Додано компонент оновлення коментаря
import UpdateTag from './components/updates/UpdateTag';

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
            <li><Link to="/add-user">Add Or DeleteUser</Link></li>
            <li><Link to="/add-category">Add Or DeleteCategory</Link></li>
            <li><Link to="/add-ad">Add Or DeleteAd</Link></li>
            <li><Link to="/add-comment">Add Or DeleteComment</Link></li>
            <li><Link to="/add-tag">Add Or DeleteTag</Link></li>
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
          <Route path="/add-user" component={AddOrDeleteUser} />
          <Route path="/add-category" component={AddOrDeleteCategory} />
          <Route path="/add-ad" component={AddOrDeleteAd} />
          <Route path="/add-comment" component={AddOrDeleteComment} />
          <Route path="/add-tag" component={AddOrDeleteTag} />
          <Route path="/ads-with-details" component={AdsListWithDetails} />
          <Route path="/ads-by-price" component={AdsByPrice} />
          <Route path="/ad-count-by-category" component={AdCountByCategory} />
          <Route path="/update-user/:id" component={UpdateUser} /> 
          <Route path="/update-category/:id" component={UpdateCategory} /> 
          <Route path="/update-ad/:id" component={UpdateAd} /> 
          <Route path="/update-comment/:id" component={UpdateComment} /> 
          <Route path="/update-tag/:id" component={UpdateTag} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
