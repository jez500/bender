// const bodyParser = require('body-parser')
// const app = require('express')()
// const fs = require('fs');
//
// module.exports = { path: '/api', handler: app }
// app.use(bodyParser.json());
//
// app.post('/save', (req, res) => {
//   //res.json(req.body)
//   fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
//     if (err) return console.log(err);
//     console.log('Hello World > helloworld.txt');
//   });
// })

const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json())
const fs = require('fs');

app.post('/save', (req, res) => {
  console.log("Req body is: ", req.body)
  fs.writeFile('~/helloworld.txt', req.body, function (err) {
     if (err) return console.log(err);
     console.log('Hello World', req.body);
  });
})

module.exports = app
