const user = require("../models/user");
const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/sign-token");

const getAllusers = (req, res) => {
  user
    .getAllUsers()
    .then((users) => {
      res.status(200).json({ users: users.toJSON() });
    })
    .catch((err) => {
      res.status(404).json({ error: err });
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
            res.status(200).json({ token: token, user: _usr });
          } else {
            res.status(404).json({ error: "Invalid credentials" });
          }
        } else {
          res.status(404).json({ error: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } else {
    res.status(400).json({ error: "Both email and password is required" });
  }
};

const getLoggedInUser = (req, res) => {
  if (req.decoded.id) {
    user
      .getUser(req.decoded.id)
      .then((usr) => {
        if (usr.count != 0) {
          res.status(200).json(usr.toJSON());
        } else {
          res.status(404).json({ error: "Profile not found" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err });
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
              res.status(201).json({ user: user });
            })
            .catch((err) => {
              res.status(400).json({ error: err });
            });
        } else {
          res.status(409).json({ error: "User alredy exists" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err });
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
              res.status(0).json({ user: usr });
            })
            .catch((err) => {
              res.status(400).json({ error: err });
            });
        } else {
          res.status(404).json({ error: "Profile not found" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err });
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
