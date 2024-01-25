const express = require('express')
const sequelize = require('sequelize')
const path = require('path')
const bodyParser = require('body-parser')

const port = 3000
const app = express()

const db = new sequelize.Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite') // './db.sqlite'
})

const userModel = db.define('users', {
  username: {
    type: sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
})

try {
  db.authenticate().then(() => {
    console.log('database connected successfully.')
    db.sync({ alter: true })
  })
} catch (err) {
  console.log('cannot connect to database: ')
  console.log(err)
}

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.render('index', { greeting: 'Hi' })
})

app.get('/login', function (req, res) {
  console.log('hi')
  res.render('login', { greeting: 'Hi' })
})

app.get('/register', function (req, res) {
  res.render('register')
})

app.post('/register', function (req, res) {
  userModel.create({
    username: req.body.username,
    password: req.body.password,
  })
  res.render('register')
})

app.listen(port, function () {
  console.log('Server is running on: http://localhost:' + port)
})
