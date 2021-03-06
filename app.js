const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const port = process.env.PORT || 3000

const items = [];
const workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res) {

          const day = date.getDate()
          res.render("list", {
                    listTitle: day,
                    todos: items,
          });
});

app.post('/', function(req, res) {
          const item = req.body.newListItem;

          if (req.body.list === "Work") {
                    workItems.push(item);
                    res.redirect('/work');
          } else {
                    items.push(item);
                    res.redirect('/');
          }
});

app.get('/work', function(req, res) {
          res.render("list", {
                    listTitle: "Work List",
                    todos: workItems,
          });
});

app.post('/work', function(req, res) {
          let item = req.body.newItem;
          workItems.push(item);

          res.redirect('/work');
});

app.get('/about', function(req, res) {
          res.render('about');
});

app.listen(port, function() {
          console.log(`Server started at port: ${port}`);
})
