push subdirectory to heroku

git subtree push --prefix server heroku master

<!-- https://jtway.co/deploying-subdirectory-projects-to-heroku-f31ed65f3f2 -->


<!-- login to db -->
heroku pg:psql

PORT=4001
DATABASE_URL=postgres://nnqqdsyvdjafnf:80eab47184b40813b203bbd091ec5b57cf4725ffd52158da1eea43471c20b35c@ec2-44-196-146-152.compute-1.amazonaws.com:5432/d5m20tps3rum3r
jwtSecret = cat123
