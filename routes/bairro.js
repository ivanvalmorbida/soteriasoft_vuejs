var express = require('express')
var router  = express.Router()
var settings = require("../settings")
var mysql   = require('mysql')

router.post('/bairro/nome', nome)
router.post('/bairro/cidade', cidade)
router.post('/bairro/cidade_nome', cidade_nome)

function cidade(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var data = req.body

  connection.connect()
  connection.query('Select ba.codigo, ba.nome from tbcep as ce'+
  ' inner join tb_bairro as ba on ce.bairro=ba.codigo'+
  ' where ce.uf=? And ce.cidade=? group by ba.codigo, ba.Nome'+
  ' order by ba.Nome;', [data.uf, data.ci], function(err, rows) {
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
  connection.query("select codigo,nome from tb_bairro Where nome like '"+
  txt+"%' order by Nome LIMIT 20;", function(err, rows) {
    if (!err)
      res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

function cidade_nome(req, res) {
  var connection = mysql.createConnection(settings.dbConect)
  var txt = req.body.str
  var est = req.body.est
  var cid = req.body.cid

  connection.connect()
  connection.query("Select ba.codigo, ba.nome from tb_bairro as ba"+
  " where ba.codigo in(select bairro from tb_cep where estado=? and cidade=?)"+
  " and ba.nome like '"+txt+"%' order by ba.Nome LIMIT 20", 
  [est, cid], function(err, rows) {
    if (!err)
      res.json(rows)
    else
      console.log('Error mensage: '+err)
  })
  connection.end()
}

module.exports = router