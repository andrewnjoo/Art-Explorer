const Pool = require("pg").Pool;

//local use
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "artexplorer",
//     password: "root",
//     port: 5432,
// });

//heroku use
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
