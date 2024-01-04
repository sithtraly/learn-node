const express = require('express')

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set(express.static('public'))

app.use('/', function(req, res) {
  res.render('index', {greeting: 'Hi'})
})

app.listen(port, function () {
  console.log('Server is running on: http://localhost:' + port)
})
