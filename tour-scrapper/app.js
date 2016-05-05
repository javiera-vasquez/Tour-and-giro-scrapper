"use strict";

// load modules
let _ = require('lodash');
let request = require('request');
let express = require('express');
let scrapper = require('./scrapper');
// Call instance
let app = express();
let task = scrapper();

app.get('/:id', function (req, res) {
  let url = makeUrl(req.params.id);
  console.log('request => ', url);
  // make request
  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      // console.log('hola hola el id es valido :)');
      task.setResults(html);
      res.send(JSON.stringify(task.getResult()));
    }
  });

});

app.listen(3001, function () {
  console.log('scrapping request in port 3001!');
});

function makeUrl(id) {
  return 'http://www.procyclingstats.com/mob/race.php?id=' + id;
}
