const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", "views");

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "J@feth2003",
  database: "blockbuster",
});

// Connect to database
conn.connect((err) => {
  if (err) console.log(err);
  else console.log("connection worked!");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/movies", (req, res) => {
  console.log(req.body.director);
  let directorName;
  directorName = req.body.director;

  // Runs Queries
  conn.query(
    `SELECT movieName FROM movies WHERE director = '${req.body.director}'`,
    (err, row) => {
      if (err) console.log(err);
      else
        res.render("movies", {
          directorName: directorName,
          director: row,
        });
    }
  );
});

app.listen(3000);
