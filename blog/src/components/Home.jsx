import React, { useState, useEffect } from "react";
import axios from "axios";
// import Homepostpreview from './posts/homepostpreview';
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/home.css";
import Pagination from "./Pagination";

function Homepostpreview(props) {
  const [readMore, setReadMore] = useState(false);
  
  // const {post} = props.postbody
  const a = <div dangerouslySetInnerHTML={{ __html: props.data.postbody }} />;

  const linkName = readMore ? "Read Less << " : "Read More >> ";

  let im = props.data.postbody;

  let b = im.search('<img src="');
  let c;
  if (b !== -1) {
    c = im.indexOf(">", b);
  }

  let imgsize = im.substring(b, c + 1);
  let re = imgsize.replace(">", 'class="image">');
  console.log("data is re ", re);
  return (
    <div>
      <div className="container border border-secondary mt-5">
        <div className="container d-flex flex-row d-highlight p-2 mb-2">
          <div className="imagecont col-3 bd-highlight align-middle">
            {/* <h1>{imgsize}</h1> */}
            {b !== -1 ? (
              <div dangerouslySetInnerHTML={{ __html: re }} />
            ) : (
              <span className="imgicon">
                <FontAwesomeIcon icon={faImage} size="10x" />
              </span>
            )}
          </div>
          <div className="post bd-highlight">
            <div className="title container">
              <h2>{props.data.posttitle}</h2>
            </div>
            <div className="underline border-bottom mt-5"></div>
            <div className="readmore">
              <a
                className="read-more-link"
                onClick={() => {
                  setReadMore(!readMore);
                }}
              >
                <h3>{linkName}</h3>
              </a>
              {readMore && a}
            </div>
            <div>{readMore && a}</div>
            <div className="underline border-bottom mt-1"></div>
            <div className="authour">
              <p>
                - By <b>{props.data.authourname}</b>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home(props) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(async () => {
    await axios
      .get(`http://localhost:4000/getall/posts`)
      // .then((response) => {
      //   if (response) return response.json();
      // })
      .then((res) => {
        console.log("posts home", res.data.message);
        setPosts(res.data.message);
      })

      .catch((error) => setError("Something went"));
  }, []);

  const handleSignin = () => {
    props.history.push("/signin");
  };

  const handleSignup = () => {
    props.history.push("/signup");
  };

  return (
    <div>
      <div>
        <div className="credbtns d-flex">
          <button className="subtn container m-2" onClick={handleSignup}>
            SIGNUP
          </button>
          <button className="sibtn container m-2" onClick={handleSignin}>
            SIGNIN
          </button>
        </div>
      </div>
      <div>
        <div className="homeheading container mt-2">
          <h1>Latest Perspectives</h1>
        </div>
        <>
          <Pagination
            data={posts}
            RenderComponent={Homepostpreview}
            pageLimit={posts.length}
            dataLimit={4}
          />
        </>
      </div>
    </div>
  );
}

export default Home;
