var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/cidade/nome', nome)
router.post('/cidade/uf_nome', uf_nome)

function nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var str = req.body.str

  connection.connect()
  connection.query("select codigo,nome from tb_cidade where nome like '"+
  str+"%' order by nome LIMIT 20", function(err, rows) {
    if (!err)
      res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function uf_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.query.txt
  var est = req.query.est

  connection.connect()
  connection.query("select ci.codigo, ci.nome from tb_cidade as ci"+
  " where ci.codigo in(select cidade from tb_cep where estado=?)"+
  " and ci.nome like '"+txt+"%' order by ci.nome LIMIT 20", 
  [est], function(err, rows) {
    if (!err)
      res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}


function cidade_todas(req, res) {
  var connection = mysql.createConnection(settings.dbConect)

  connection.connect()
  connection.query('select codigo,nome from tb_cidade order by nome', function(err, rows) {
    if (!err)
      res.json({cidade_todas: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function cidade_estado(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('select ci.codigo, ci.nome from tbcep as ce'+
  ' inner join tb_cidade as ci on ce.cidade=ci.codigo'+
  ' where ce.uf=? group by ci.codigo, ci.Nome'+
  ' order by ci.Nome;', [data.uf], function(err, rows) {
    if (!err)
      res.json({RecordsOfState: rows})
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router