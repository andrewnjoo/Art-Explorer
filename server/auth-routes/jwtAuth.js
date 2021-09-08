const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../auth-utils/jwtGenerator");
const validInfo = require("../auth-middleware/validInfo");
const authorization = require("../auth-middleware/authorization");

//register route
router.post("/register", validInfo, async (req, res) => {
  try {
    //1. destructure req.body (name, email, pwd)
    const { name, email, password } = req.body;
    //2. check if user exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists.");
    }
    //3. encrypt the password
    const salt = await bcrypt.genSalt(10);

    const bcryptPassword = await bcrypt.hash(password, salt);
    //4. enter user inside our db
    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) values ($1, $2, $3) returning *;",
      [name, email, bcryptPassword]
    );

    // res.json(newUser.rows[0]);
    //5. generating jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//login route
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure req body
    const { email, password } = req.body;

    //2. check if user doesn't exist

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect");
    }

    //3. check if incoming pwd is same as db pwd

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or email is incorrect");
    }

    //4. give them the jwt token

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    // console.log('test3')
    console.error(err.message);
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
