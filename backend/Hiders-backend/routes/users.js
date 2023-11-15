const express = require("express");
const bcrypt = require("bcrypt");
const app = express.Router();
const USER_MODEL_DB = require("../models/user_model");
const bodyParser = require("body-parser");
const sessionValidation = require("../models/session_model");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const jsonParser = bodyParser.json();

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/logout", jsonParser, async (req, res) => {
  const cookie = req.cookies["SESSION_ID"];

  await sessionValidation.findOneAndDelete({ SESSION_ID: cookie });

  res.clearCookie("SESSION_ID");

  res.json({ data: true }).end();
});

app.get("/users", jsonParser, async (req, res) => {
  const cookie = req.cookies["SESSION_ID"];

  const validateSession = await sessionValidation.findOne({
    SESSION_ID: cookie,
  });

  if (validateSession === null) {
    res.json({
      sucess: false,
    });
  } else if (cookie !== undefined) {
    try {
      const users = await USER_MODEL_DB.find();
      res.json({ data: users, sucess: true });
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  } else {
    res.json({ data: null });
  }
});

app.patch("/users", jsonParser, async (req, res) => {
  try {
    const updatedUser = await USER_MODEL_DB.updateOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (updatedUser) {
      res.status(200).json({ data: updatedUser, message: "success" });
    } else {
      res.status(400).json({ data: null, message: "something went wrong" });
    }
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

app.delete("/users", jsonParser, async (req, res) => {
  try {
    const user = await USER_MODEL_DB.findOneAndDelete({
      email: req.body.email,
    });
    if (user === null) {
      res.json({ data: "user not found" });
    } else {
      res.json({ data: "user deleted" });
    }
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

app.post("/users", jsonParser, async (req, res) => {


  const userDataFromDb = await USER_MODEL_DB.findOne({
    email: req.body.email,
  });

  if (userDataFromDb) {
    res.json({
      data: {
        message: "Email already in use",
        error: null,
      },
    });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new USER_MODEL_DB({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const newSession = new sessionValidation({
      SESSION_ID: uuidv4(),
      USER_MAGNET: req.body.email,
    });

    await newSession.save();
    await newUser.save();

    res
      .status(200)
      .cookie("SESSION_ID", newSession.SESSION_ID, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .json({
        data: {
          message: "user created ",
          error: null,
          sucess: true,
        },
      });
  }
});

app.post("/users/login", jsonParser, async (req, res) => {
  const cookie = req.cookies["SESSION_ID"];
  
  const expirationDate = new Date(Date.now() + 1000 * 60 * 1000)

  const validateSession = await sessionValidation.findOne({
    SESSION_ID: cookie,
  });

  if (req.body.email === undefined && cookie !== undefined) {
    const userDataFromDb = await USER_MODEL_DB.findOne({
      email: validateSession.USER_MAGNET,
    });

    if (userDataFromDb !== null) {
      res
        .cookie("SESSION_ID", validateSession.SESSION_ID, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
        })
        .json({
          sucess: true,
          data: {
            name: userDataFromDb.name,
            email: userDataFromDb.email,
          },
        });
    }
  } else if (req.body.email !== null && req.body.password !== null) {
    const userDataFromDb = await USER_MODEL_DB.findOne({
      email: req.body.email,
    });

    const deleteOldSession = await sessionValidation.findOneAndDelete({
      USER_MAGNET: req.body.email,
    });

    if (userDataFromDb === null) return res.json({ data: "user not found" });

    const newSession = new sessionValidation({
      SESSION_ID: uuidv4(),
      USER_MAGNET: req.body.email,
    });

    await newSession.save();

    bcrypt.compare(
      req.body.password,
      userDataFromDb.password,
      function (err, response) {
        if (err) {
          res.json({ data: "internal server error" });
        }
        if (res) {
          console.log(res);
          res
            .cookie("SESSION_ID", newSession.SESSION_ID, {
              expires:expirationDate,
              secure: true,
              httpOnly: true,
              sameSite: "none",
            })
            .json({
              sucess: response,
              data: {
                name: userDataFromDb.name,
                email: userDataFromDb.email,
              },
            });
        } else {
          // response is OutgoingMessage object that server response http request
          res.json({
            success: false,
            message: "passwords do not match",
          });
        }
      }
    );
  }
});

module.exports = app;
