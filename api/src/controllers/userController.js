const user = require("../models/user");
const bcrypt = require("bcryptjs");
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
            const _usr = {
              id: usr[0].id,
              name: usr[0].name,
              eamil: usr[0].email,
              address: usr[0].address,
            };
            res.json({ token: token, user: _usr }).status(200);
          } else {
            res.json({ error: "Invalid credentials" }).status(404);
          }
        } else {
          res.json({ error: "Invalid credentials" }).status(404);
        }
      })
      .catch((err) => {
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
        if (usr.count != 0) {
          res.json(usr.toJSON()).status(200);
        } else {
          res.json({ error: "Profile not found" }).status(404);
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

const updateUser = (req, res) => {
  if (req.decoded.id) {
    user
      .getUser(req.decoded.id)
      .then((usr) => {
        if (usr.count != 0) {
          if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 5);
          }
          user
            .updateUser(usr[0].id, req.body)
            .then((usr) => {
              res.json({ user: usr }).status(200);
            })
            .catch((err) => {
              res.json({ error: err }).status(400);
            });
        } else {
          res.json({ error: "Profile not found" }).status(404);
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
  updateUser,
  getLoggedInUser,
};
