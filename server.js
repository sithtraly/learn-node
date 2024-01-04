const express = require('express')

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set(express.static('public'))

app.get('/', function(req, res) {
  res.render('index', {greeting: 'Hi'})
})

app.get('/login', function(req, res) {
  console.log('hi')
  res.render('login', {greeting: 'Hi'})
})

app.listen(port, function () {
  console.log('Server is running on: http://localhost:' + port)
})
