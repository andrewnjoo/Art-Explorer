// import modules
const router = require("express").Router();
const pool = require("./db");
const validInfo = require("./auth-middleware/validInfo");
const authorization = require("./auth-middleware/authorization");

//get art
function getArt(req,res){
    res.status(200).send('hello')
}

module.exports = {
    getArt
}