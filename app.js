const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const app = express();

const items = [];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  let day = date.getDate();
  res.render('list', { listTitle: day, newListItems: items });
});

app.post('/', (req, res) => {
  let item = req.body.newItems;
  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', newListItems: workItems });
});

app.post('/work', (req, res) => {
  let items = req.body.newItems;
  workItems.push(newItems);
  res.redirect('/work');
});

app.listen(3000, () => {
  console.log('Server started at port 3000');
});
