//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const date = require(__dirname + '/date.js');

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  const day = date.getDate();


  ///////////////////////////// To do List Page
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", (req, res) => {

  let item = req.body.newItem;

  if (req.body.list === "Work List") {
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
app.get('/about', (req, res) => {
  res.render("about");
});



/////////////////////////////////// PORT Stuff
app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});
