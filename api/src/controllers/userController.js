const user = require("../models/user");
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/sign-token");

const getAllusers = (req, res) => {
  user
    .getAllUsers()
    .then((users) => {
      res.json({ users: users.toJSON() }).status(200);
    })
    .catch((err) => {
      res.json({ error: err }).status(404);
    });
};

const doLogin = (req, res) => {
  if (req.body.email && req.body.password) {
    // find user by email
    user
      .getUser(req.body.email)
      .then((usr) => {
        if (usr.count == 1) {
          // compare the hash password to authenticate
          if (bcrypt.compareSync(req.body.password, usr[0].password)) {
            //generate jwt token
            const token = signToken(usr[0].email);
            res.json({ token: token }).status(200);
          } else {
            res.json({ error: "Invalid credentials 2" }).status(404);
          }
        } else {
          res.json({ error: "Invalid credentials 1" }).status(404);
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: err }).status(400);
      });
  } else {
    res.json({ error: "Both email and password is required" }).status(400);
  }
};

const getLoggedInUser = (req, res) => {
  if (req.decoded.id) {
    user
      .getUser(req.decoded.id)
      .then((usr) => {
        if(usr.count != 0){
          res.json(usr.toJSON()).status(200);
        } else {
          res.json({error: "Profile not found"}).status(404)
        }
      })
      .catch((err) => {
        res.json({ error: err }).status(400);
      });
  }
};

const createUser = (req, res) => {
  if (req.body.email) {
    user
      .getUser(req.body.email)
      .then((usr) => {
        if (usr.count == 0) {
          // hash the password
          if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 5);
          }
          user
            .createUser(req.body)
            .then((user) => {
              res.json({ user: user }).status(201);
            })
            .catch((err) => {
              res.json({ error: err }).status(400);
            });
        } else {
          res.json({ error: "User alredy exists" }).status(409);
        }
      })
      .catch((err) => {
        res.json({ error: err }).status(400);
      });
  }
};

module.exports = {
  getAllusers,
  doLogin,
  createUser,
  getLoggedInUser,
};
