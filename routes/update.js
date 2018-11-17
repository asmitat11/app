var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');



/* GET users listing. */
router.get('/', function(req, res, next) {



 
var db = req.db;
var collection = db.get('tbl_question');
  
  collection.findOne({status : 0},{},function(e,docs){

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
    await page.goto(docs.url, {waitUntil: 'load', timeout: 0});
    const text = await page.$eval('*', el => el.innerText);
   //console.log(text)  
    var result = text.replace(/ /g, '');
    mySubString = result.substring(
        result.lastIndexOf("Seeallquestions(") + 16 , 
        result.lastIndexOf(")")
    );

       collection.update({'_id':docs._id}, 
    { $set: {'count': mySubString , 'status' : 1 } }, function(err, result) { 

      if(err) { throw err; } 
      
      db.close(); 
      
      res.redirect('/'); 

    }); 

    await browser.close();
  })();
   
  
    

  });


 

  


  // collection.find({},{},function(e,docs){
  //   res.json(docs);
  // });
});

module.exports = router;