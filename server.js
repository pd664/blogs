// require("dotenv").config();
// const sqlite3 = require("sqlite3").verbose();
// var bcrypt = require("bcryptjs");
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
// const utils = require("./utils");
// const mongoose = require('mongoose')
// const mongodb = require('mongodb')
// const app = express();
// const port = process.env.PORT || 4000;
// // const Credentials = require('./schema')

// // const db1 = 'mongodb+srv://pd664:parteek123@cluster0.ftmdt.mongodb.net/credentials?retryWrites=true&w=majority'

// // mongoose.connect(db1, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
// //   console.log(`connection successfull`)
// // }).catch(err => console.log(err))

// app.use(cors());

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// // app.post("/users/signup", (req, res) => {
// //   const name = req.body.name;
// //   const user = req.body.username;
// //   const pwd = req.body.password;

// //   const signup = new Credentials({
// //     name : name,
// //     username : user,
// //     password: pwd
// //   })
// //   signup.save()
// //   .then((res) => {
// //     console.log(res)
// //   })
// //   .catch(err => console.log(err))
// // })

// app.use(function (req, res, next) {
//   var token = req.headers["authorization"];
//   if (!token) return next(); //if no token, continue

//   token = token.replace("Bearer ", "");
//   jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//     if (err) {
//       return res.status(401).json({
//         error: true,
//         message: "Invalid user.",
//       });
//     } else {
//       req.user = user;
//       next();
//     }
//   });
// });

// app.get("/", (req, res) => {
//   if (!req.user)
//     return res
//       .status(401)
//       .json({ success: false, message: "Invalid user to access it." });
//   res.send("Welcome to the Node.js Tutorial! - " + req.user.name);
// });

// // app.post("/users/signup", (req, res) => {
// //   console.log("signup")
// //   const name = req.body.name;
// //   const user = req.body.username;
// //   const pwd = req.body.password;
// //   if (!name || !user || !pwd) {
// //     return res.status(400).json({
// //       error: true,
// //       message: "Please enter all details",
// //     });
// //   }
// //   let db = new sqlite3.Database("credentials");

// //   let sql = `Insert into credentials (name, username, password)
// //        SELECT "${name}", "${user}", "${pwd}"
// //        WHERE not exists (select * from credentials where username = "${user}" )`;
// //   db.run(sql, function (err) {
// //     if (err) {
// //       return res.status(400).json({
// //         error: true,
// //         message: "Username already taken",
// //       });
// //     } else if (this.change > 0) {
// //       return res.status(200).json({
// //         error: false,
// //         message: "Account created successfully",
// //       });
// //     }
// //   });
// //   db.close();
// // });

// app.post("/users/signin", function (req, res) {
//   console.log("/signin");
//   const user = req.body.username;
//   const pwd = req.body.password;
//   if (!user || !pwd) {
//     return res.status(400).json({
//       error: true,
//       message: "Username or Password is required.",
//     });
//   }
//   let db = new sqlite3.Database("credentials");

//   let sql = `SELECT * FROM credentials WHERE (username = "${user}") `;
//   console.log(sql);
//   db.all(sql, [], (err, data) => {
//     if (err) {
//       return res.status(400).json({
//         error: true,
//         message: err,
//       });
//     } else if (data.length > 0) {
//       console.log(data.length, "data")

//       data.map((row) => {
//         console.log("row", row.username);
//         if (user == row.username) {

//           let a = bcrypt.compareSync(pwd, row.password);

//           if (a == true) {
//             const token = utils.generateToken(row);

//             const userObj = utils.getCleanUser(row);

//             return res.status(200).json({ user: userObj, token });
//           }
//         }

//         else {
//           return res.status(401).json({
//             error: true,
//             message: "Username or Password is Wrong.",
//           });
//         }
//       });
//     } else{
//       console.log("called");
//       return res.status(401).json({
//         error: true,
//         message: "No user found.",
//       });
//     }
//   });
//   db.close();
// });

// // VERIFY TOKEN

// app.get("/verifyToken", function (req, res) {
//   var token = req.query.token;
//   if (!token) {
//     return res.status(400).json({
//       error: true,
//       message: "Token is required.",
//     });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//     if (err)
//       return res.status(401).json({
//         error: true,
//         message: "Invalid token.",
//       });
//     let db = new sqlite3.Database("credentials");

//     let sql = `SELECT * FROM credentials WHERE (username = "${user.username}") `;
//     db.all(sql, [], (err, data) => {
//       if (err) {
//         return res.status(401).json({
//           error: true,
//           message: err,
//         });
//       } else if (data) {
//         data.forEach((row) => {
//           if (user.userId !== row.id) {
//             return res.status(401).json({
//               error: true,
//               message: "Invalid user.",
//             });
//           }
//           var userObj = utils.getCleanUser(row);
//           return res.json({ user: userObj, token });
//         });
//       }
//     });
//   });
// });

// app.post("/addpost", (req, res) => {
//   let authourid = Number(req.body.userid);
//   let authourname = req.body.username;
//   let body = req.body.body;
//   let title = req.body.title;

//   let db = new sqlite3.Database("posts");

//   let sql = `INSERT INTO posts (authourid, authourname, postbody, posttitle)
//     VALUES (${authourid}, '${authourname}', '${body}', '${title}')`;

//   db.run(sql, function (err) {
//     if (err) {
//       return res.status(406).json({
//         error: true,
//         message: err.message,
//       });
//     } else if (this.change > 0) {
//     }
//     return res.status(200).json({
//       message: "YOUR POSTS HAS PUBLISHED",
//     });
//   });
//   db.close();
// });

// app.post("/user/posts", (req, res) => {
//   let token = req.body.token;
//   jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//     let db = new sqlite3.Database("posts");
//     let sql = `select * from posts where authourid = ${user.userId}`;
//     db.all(sql, (err, data) => {
//       if (err) {
//         res.status(404).json({
//           error: true,
//           message: err.message,
//         });
//       } else {
//         if (data !== []) {
//           res.status(200).json({
//             message: data,
//           });
//         }
//       }
//     });
//     db.close();
//   });
// });

// app.post("/deletepost", (req, res) => {
//   let id = req.body.id;
//   let authourid = req.body.authourid;
//   let db = new sqlite3.Database("posts");

//   let sql = `delete from posts where (id = ${id} and authourid= ${authourid})`;
//   db.run(sql, (err) => {
//     if (err) {
//       res.status(404).json({
//         message: "User not found",
//       });
//     } else {
//       res.status(200).json({
//         message: "Are you sure you want to delete that post?",
//       });
//     }
//   });
//   db.close();
// });

// app.get("/getall/posts", (req, res) => {
//   console.log("getall/posts")
//   let db = new sqlite3.Database("posts");
//   let sql = `select * from posts`;
//   db.all(sql, (err, data) => {
//     if (err) {
//       res.status(404).json({
//         message: "Something went wrong",
//       });
//     } else {
//       if (data) {
//         res.status(200).json({
//           message: data,
//         });
//       }
//     }
//   });
// });

// app.listen(port, () => {
//   console.log("Server started on: " + port);
// });

require("dotenv").config();
var bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const utils = require("./utils");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;
const Credentials = require("./schema/credentiialSchema");
const Posts = require("./schema/postSchema");
const db1 = "mongodb+srv://pd664:parteek123@cluster0.ftmdt.mongodb.net/blog?retryWrites=true&w=majority";
const path = require('path')
mongoose
  .connect(db1 || `mongodb://localhost/blogdemoappreact`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`connection successfull`);
  })
  .catch((err) => console.log(err));

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user;
      next();
    }
  });
});

// app.get("/", (req, res) => {
//   if (!req.user)
//     return res
//       .status(401)
//       .json({ success: false, message: "Invalid user to access it." });
//   res.send("Welcome to the Node.js Tutorial! - " + req.user.name);
// });

app.post("/users/signup", (req, res) => {
  console.log("/signup");
  console.log("done")
  const name = req.body.name;
  const user = req.body.username;
  const pwd = req.body.password;
  if (!name || !user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Please enter all details",
    });
  }

  const signup = new Credentials({
    name: name,
    username: user,
    password: pwd,
  });
  Credentials.find({ username: user }, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err,
      });
    } else if (result.length < 1) {
      signup.save();

      return res.status(200).json({
        error: false,
        message: "Account created successfully",
      });
    } else if (result.length >= 1) {
      return res.status(400).json({
        error: true,
        message: "Username already taken",
      });
    }
  });
});

app.post("/users/signin", function (req, res) {
  console.log("/signin");
  const user = req.body.username;
  const pwd = req.body.password;
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password is required.",
    });
  }


  Credentials.find({ username: user }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err,
      });
    } else if (data.length > 0) {
      data.map((row) => {
        if (user == row.username) {
          let a = bcrypt.compareSync(pwd, row.password);

          if (a == true) {
            const token = utils.generateToken(row);

            const userObj = utils.getCleanUser(row);

            return res.status(200).json({ user: userObj, token });
          }
        } else {
          return res.status(401).json({
            error: true,
            message: "Username or Password is Wrong.",
          });
        }
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "No user found.",
      });
    }
  });
});

app.get("/verifyToken", function (req, res) {
  var token = req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    Credentials.find({ username: user.username }, (error, data) => {
      if (error) {
        return res.status(401).json({
          error: true,
          message: error,
        });
      } else if (data) {
        data.forEach((row) => {
          if (user.userId !== row.id) {
            return res.status(401).json({
              error: true,
              message: "Invalid user.",
            });
          }
          var userObj = utils.getCleanUser(row);
          return res.json({ user: userObj, token });
        });
      }
    });
  });
});

app.post("/addpost", (req, res) => {
  let authourid = req.body.userid;
  let authourname = req.body.username;
  let body = req.body.body;
  let title = req.body.title;

  const post = new Posts({
    authourid: authourid,
    authourname: authourname,
    postbody: body,
    posttitle: title,
  });

  post
    .save()
    .then((result) => {
      return res.status(200).json({
        message: "YOUR POSTS HAS PUBLISHED",
      });
    })
    .catch((err) => {
      return res.status(406).json({
        error: true,
        message: err.message,
      });
    });
});

app.post("/user/posts", (req, res) => {
  let token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, function (error, user) {
    Posts.find({ authourid: user.userId }, (err, data) => {
      if (err) {
        res.status(404).json({
          error: true,
          message: err.message,
        });
      } else {
        if (data !== []) {
          res.status(200).json({
            message: data,
          });
        }
      }
    });
  });
});

app.post("/deletepost", (req, res) => {
  console.log("deleted");
  let id = req.body.id;
  let authourid = req.body.authourid;

  Posts.deleteOne({ _id: id }, { authourid: authourid })
    .then(() => {
      res.status(200).json({
        message: "Are you sure you want to delete that post?",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "post not found",
      });
    });
});

app.get("/getall/posts", (req, res) => {
  console.log("getall/posts");
  Posts.find({}, (err, data) => {
    if (err) {
      res.status(404).json({
        message: "Something went wrong",
      });
    } else {
      if (data) {
        res.status(200).json({
          message: data,
        });
      }
    }
  });
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('blog/build'))
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, 'blog', 'build', 'index.html'))
  // })
}

app.listen(port, () => {
  console.log("Server started on: " + port);
});
