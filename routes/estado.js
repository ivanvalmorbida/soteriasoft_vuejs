var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/estado/nome', nome)
router.post('/estado/sigla', sigla)
router.post('/estado/todos', todos)

function todos(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query('SELECT * from tb_estado', function(err, rows, fields) {
    if (!err)
      res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.body.str

  connection.connect()
  connection.query("select codigo, sigla, nome from tb_estado"+
  " where nome like '"+txt+"%' order by nome LIMIT 20", function(err, rows) {
    if (!err)
      res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function sigla(req, res) {
  var connection = mysql.createConnection(settings.dbConect);
  var txt = req.body.str

  connection.connect()
  connection.query("select codigo, sigla from tb_estado"+
  " where sigla like '"+txt+"%' order by sigla", function(err, rows) {
    if (!err)
      res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router