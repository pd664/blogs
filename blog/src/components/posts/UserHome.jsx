import React, { useState, useEffect } from "react";
import "../../styles/userhome.css";
import { getUser, removeUserSession, getToken } from "../../Utils/Common";
import axios from "axios";
import Postpreview from "./Postpreview";
import { faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserHome(props) {
  const user = getUser();
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const token = getToken();
    axios
      .post(`http://localhost:4000/user/posts`, {
        token: token,
      })
      .then((response) => {
        console.log(response.data.message);
        setPosts(response.data.message);
      })
      .catch((error) => console.log(error));
  }, [posts]);

  const handleNewPost = () => {
    props.history.push("/edit");
  };

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/signin");
  };
  return (
    <div>
      <div>
        <div></div>
        <div className="container-fluid">
          <div className="row content">
            <div className="col-sm-1 sidenav">
              <h1 className="welcome">
                Welcome {user.name}!<br />
                <br />
              </h1>
              <button className="newpost" onClick={handleNewPost}>
                <span id="newPostcontent">
                  <FontAwesomeIcon icon={faPlus} /> New POST
                </span>
              </button>
              <br />
              <br />
              <button className="signout" onClick={handleLogout}>
                <span id="signoutcontent">
                  <FontAwesomeIcon icon={faSignOutAlt} /> SIGN OUT
                </span>
              </button>
            </div>
            <div className="bod col-sm-1 border-right "></div>
            <div className="posts col-sm-8 p-5 ml-5">
              <h2>Your Posts</h2>

              {posts.map((post, key) => {
                let a = post.postbody;
                let b = a.search('<img src="');
                let c;
                if (b !== -1) {
                  c = a.indexOf(">", b);
                }

                return (
                  <div>
                    <Postpreview
                      key={key}
                      post={post.postbody}
                      title={post.posttitle}
                      img={a.substring(b, c + 1)}
                      authourid={post.authourid}
                      postid={post._id}
                    />
                    {/* <h1>{post.id}</h1>
                      <h1>{b}</h1>
                      <h1>{c}</h1>
                      <h1>{a}</h1> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
