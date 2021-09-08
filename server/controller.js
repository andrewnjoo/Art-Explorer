// import modules
const jwt = require("jsonwebtoken")
const router = require("express").Router();
const pool = require("./db");
const validInfo = require("./auth-middleware/validInfo");
const authorization = require("./auth-middleware/authorization");

require("dotenv").config();


//get art
function getArt(req,res){
    const jwtToken = req.header("token");
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    console.log(payload)
    res.status(200).send('hello')
}

//add artist
function addArtist(req,res){
    //verify jwt token
    const jwtToken = req.header("token");
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    pool.query("INSERT INTO artists (name, user_id) VALUES ($1, $2);", [
        req.body.name,
        req.user
    ])
    .then((results)=>{
        res.status(200).send(results)
    })
    .catch((err)=>console.log(err))
}

module.exports = {
    getArt,
    addArtist
}