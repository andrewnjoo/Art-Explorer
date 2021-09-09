// import modules
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const pool = require("./db");
const validInfo = require("./auth-middleware/validInfo");
const authorization = require("./auth-middleware/authorization");
require("dotenv").config();

//verify jwt
const verify = (input) => {
  return jwt.verify(input, process.env.jwtSecret);
};

//get art
const getArt = (req, res) => {
  try {
    const payload = verify(req.header("token"));
    pool
      .query("select * from art where user_id = $1;", [req.body.user_id])
      .then((results) => {
        res.status(200).send(results);
      });
  } catch (e) {
    console.log("error", e);
  }
};

//get artists
const getArtists = (req, res) => {
  try {
    const payload = verify(req.header("token"));
    req.user = payload.user
    pool
      .query("select name from artists where user_id = $1;", [req.user])
      .then((results) => {
        console.log(results.data)
        res.status(200).send(results);
      });
  } catch (e) {
    console.log("error", e);
  }
};

//add artist
const addArtist = async (req, res) => {
  try {
    const payload = verify(req.header("token"));
    let check;
    req.user = payload.user;
    //check current collection
    const query1 = await pool
      .query("SELECT * FROM ARTISTS WHERE user_id = $1", [req.user])
      .then((res1) => {
        // console.log(res1.rows);
        check = res1.rows;
      });
    // console.log("check is", check);
    //check for duplicates
    for (i in check) {
      if (check[i].name == req.body.name) {
        console.log('duplicate', check[i].name, req.body.name)
        res.status(400).send("duplicate detected");
        return;
      }
      console.log(check[i].name);
    }
    //insert if no duplicates found
    pool
      .query("INSERT INTO artists (name, user_id) VALUES ($1, $2);", [
        req.body.name,
        req.user,
      ])
      .then((results) => {
        res.status(200).send(results);
      });
  } catch (e) {
    console.log("error", e);
  }
};

module.exports = {
  getArt,
  getArtists,
  addArtist,
};
