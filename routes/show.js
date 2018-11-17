var express = require('express');
var router = express.Router();

router.get('/questions', function(req, res) {
  var db = req.db;
  var collection = db.get('tbl_question');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
})
module.exports = router;