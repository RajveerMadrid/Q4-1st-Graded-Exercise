// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/happy", (req, res) => {
  //Gets all needed information from the forms
  let nickname = req.body.nickname;

  let gender = req.body.gender;
  let pronoun = "";
  if (gender === "Male") {pronoun = "he's"};
  if (gender === "Female") {pronoun = "she's"};
  const jolly = `For,${pronoun},a,jolly,good,fellow.,For,${pronoun},a,jolly,good,fellow.,For,${pronoun},a,jolly,good,fellow,,which,nobody,can,deny!`;

  let number = req.body.number;

  let guests = [];
  let singers = [];

  //Gets the name of each invitee and checks if they are going
  for (let i = 0 ; i < number ; i++) {
    let guest = req.body[`name${i + 1}`];
    guests.push(guest);

    let Going = req.body[`checkbox${i + 1}`] ? true : false;
    if (Going) {
      singers.push(guest);
    }
  }

  //Gets the number of singers
  let singersNum = singers.length;
  let list = {}

  //Gets the final list of attendees to see how many are going
  for (let i = 0 ; i < number ; i++) {
    let guest = req.body[`name${i + 1}`];
    let Going = req.body[`checkbox${i + 1}`] ? true : false;

    let attending = Going ? "yes" : "no";    
    list[guest] = attending; //Assigns individual attendance status
  }

  //Gets each singer from the singers array and assigns a word to them
  let song = [
    {singer: singers[0 % singersNum], lyric: "Happy" },
    {singer: singers[1 % singersNum], lyric: "Birthday" },
    {singer: singers[2 % singersNum], lyric: "To" },
    {singer: singers[3 % singersNum], lyric: "You!" },
    {singer: singers[4 % singersNum], lyric: "Happy" },
    {singer: singers[5 % singersNum], lyric: "Birthday" },
    {singer: singers[6 % singersNum], lyric: "To" },
    {singer: singers[7 % singersNum], lyric: "You!" },
    {singer: singers[8 % singersNum], lyric: "Happy" },
    {singer: singers[9 % singersNum], lyric: "Birthday" },
    {singer: singers[10 % singersNum], lyric: "Dear" },
    {singer: singers[11 % singersNum], lyric: nickname + "!" },
    {singer: singers[12 % singersNum], lyric: "Happy" },
    {singer: singers[13 % singersNum], lyric: "Birthday" },
    {singer: singers[14 % singersNum], lyric: "To" },
    {singer: singers[15 % singersNum], lyric: "you!" },
    {singer: singers[16 % singersNum], lyric: jolly}
  ];

  //Renders happy.hbs and displays the data
  res.render("happy", {nickname, gender, number, list, singersNum, song});
});

app.get("/happy", (req, res) => {
  res.render("happy");
});

// Create express route binder for draw.hbs and get the data from the url as parameters
// that came from index.hbs

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
