var express = require('express');
var router = express.Router();




/* GET business listing. */
router.get('/:bname/:ludocid/:location_id', function(req, res, next) {
 
  var bname = req.params.bname;
  var ludocid = req.params.ludocid;
  var location_id = req.params.location_id;
  var url='https://www.google.com/search?hl=en&q='+bname+'&ludocid='+ludocid+'&cad=h';
  var mySubString;
 

  var db = req.db;
 


    var collection = db.collection('tbl_question');

    var product = {  url: url,bname : bname ,ludocid:ludocid ,  location_id : location_id ,count : 0,status : 0};

    collection.insert(product, function(err, result) {

    if(err) { throw err; }

      db.close();

      res.redirect('/');   
  });
	   
	
});

module.exports = router;