import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';

function Welcome(props) {
    const user = getUser();

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/signin');
      }
  return <div>
      <h1>Welcome!</h1>
      Welcome {user.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
  </div>;
}

export default Welcome;
