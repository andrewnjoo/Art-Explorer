const router = require("express").Router();
const pool = require("../db");
const authorization = require("../auth-middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    //after passing middleware, req.user has payload
    // res.json(req.user)

    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id =$1",
      [req.user]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("server error");
  }
});

//update name of user
router.post("/changeName", authorization, async (req, res) => {
  try {
    const response = await pool.query(
      "UPDATE users SET user_name = $1 WHERE user_id = $2",
      [req.body.name, req.user]
    );
    res.status(200).json("user name changed");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("server error");
  }
});

module.exports = router;
