//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

var items = ["Buy Food","Cook Food","Eat Food"];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day,
    newListItems: items
  });
});

app.post("/", (req, res) => {
  var item = req.body.newItem;

  items.push(item);


  res.redirect('/');

});


// app.get('/', (req, res) => {
//   res.render('index', {foo: 'FOO'});
// });

app.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${port}`);
});
