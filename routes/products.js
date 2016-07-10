var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');


/* GET all products */
router.get('/', function(req, res, next) {
  // FIXME: We should probably apply a LIMIT
  db.query('SELECT * FROM products', function(err, rows, fields) {
    if (err) next(err);
    res.json(rows);
  });
});


/* GET a specific product */
router.get('/:sku', function(req, res, next) {
  var sku = req.params.sku;

  db.query('SELECT * FROM products WHERE sku=?', [sku], function(err, rows, _) {
      if (err) next(err);
      if (rows.length == 0) return next(new Error(`Cannot find product ${sku}`));
      res.json(rows[0]);
    }
  );
});


module.exports = router;
