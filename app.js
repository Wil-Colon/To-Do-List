//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

///////////////////////////// To do List Page
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", (req, res) => {

  let item = req.body.newItem;

if (req.body.list === "Work List"){
  workItems.push(item);
  res.redirect('/work');
} else {
    items.push(item);
    res.redirect('/');
}


});

///////////////////////////////// Work List Page
app.get('/work', (req, res) => {
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItems
  });
});

// app.post('/work', (req, res) => {
//
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect('/work');
//
// });

//////////////////////////////////////About Page
app.get('/about',(req,res) => {
  res.render("about");
});



/////////////////////////////////// PORT Stuff
app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});
