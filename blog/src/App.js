import React, { useState, useEffect } from 'react';
import './styles/App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserHome from './components/posts/UserHome';
import Createblog from './components/posts/Createblog'
import Home from './components/Home'

import PaginatedItems from './Paginate'

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {
  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // return (
  //    <PaginatedItems  itemsPerPage={4} items={items} />
  // )
  const [authLoading, setAuthLoading] = useState(true);


  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return <div>
    <div id="icons" className="p-2 pb-0 text-center">
      <p id="icon"><a href="/"><FontAwesomeIcon icon={faBlog} /></a></p> 
    </div>
    
    <BrowserRouter>
    {/* <div>
      <NavLink exact activeClassName="active" to="/">SignUp</NavLink>
      <NavLink activeClassName="active" to="/signin">Login</NavLink>
      <NavLink activeClassName="active" to="/blog/posts">Userhome</NavLink>
      <NavLink activeClassName="active" to="/edit">Createblog</NavLink>
    </div> */}
    <div>
    <Switch>
    <PublicRoute exact path="/" component={Home} />
      <PublicRoute exact path="/signup" component={SignUp} />
      <PublicRoute path="/Signin" component={SignIn} />
      <PrivateRoute path="/blog/posts" component={UserHome} />
      <PrivateRoute path="/edit" component={Createblog} />
    </Switch>
    </div>
    </BrowserRouter>
  </div>;
}

export default App;
