const express = require('express')
const sequelize = require('sequelize')
const path = require('path')

const port = 3000
const app = express()

const db = new sequelize.Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite') // './db.sqlite'
})

try {
  db.authenticate().then(() => {
    console.log('database connected successfully.')
  })
} catch(err) {
  console.log('cannot connect to database: ')
  console.log(err)
}

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
