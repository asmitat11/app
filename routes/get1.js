var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');



/* GET users listing. */
router.get('/:bname/:ludocid/:location_id', function(req, res, next) {
  //res.send('respond with a resource');
  //res.send(req.query)
  var bname = req.params.bname;
  var ludocid = req.params.ludocid;
  var location_id = req.params.location_id;
  var url='https://www.google.com/search?hl=en&q='+bname+'&ludocid='+ludocid+'&cad=h';
  var mySubString;
 

    (async () => {
    
    //  const oldProxyUrl = 'http://usa-biz.info:8080';
    // const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
     const proxy='170.79.16.19:8080';
     const proxyIP='13040';
     const proxyUrl=proxy

      const options = {
       		args: [`--proxy-server=105.30.17.3:53281`],
       		ignoreHTTPSErrors: true,
    		headless: true,

		};
	  const browser = await puppeteer.launch();
	  const page = await browser.newPage();
	  await page.goto(url, {waitUntil: 'load', timeout: 0});
	  const text = await page.$eval('*', el => el.innerText);
	 //console.log(text)	
	  var result = text.replace(/ /g, '');
	  mySubString = result.substring(
		    result.lastIndexOf("Seeallquestions(") + 16 , 
		    result.lastIndexOf(")")
		);

	      var db = req.db;
 
 // var collection = db.get('tbl_question');
  

    var collection = db.collection('tbl_question');

    var product = {  url: url,bname : bname ,ludocid:ludocid ,  location_id : location_id ,count : mySubString};

    collection.insert(product, function(err, result) {

    if(err) { throw err; }

      db.close();

      res.redirect('/');   
  });
	   
	  await browser.close();
	})();


 

  


  // collection.find({},{},function(e,docs){
  //   res.json(docs);
  // });
});

module.exports = router;