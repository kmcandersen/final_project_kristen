var OAuth2 = require('OAuth').OAuth2;
var express = require('express');
var router = express.Router();

var request = require('ajax-request');

var API_HOST = "https://api.yelp.com";
var SEARCH_PATH = "/v3/businesses/search";
var BUSINESS_PATH = "/v3/businesses/";
var TOKEN_PATH = "/oauth2/token";
var GRANT_TYPE = "client_credentials";

var CLIENT_ID = "yBSQxTfRYukNfg2kMSU4Sw";
var CLIENT_SECRET = "8lGW6KoHT1V6AM4ykmLzg6l8CQwnfgW4A0RqaSCQ5tYi94Ws0nt6ULIEl0a09Gdw";

//oa = oauth.OAuth2;

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {

module.exports = router;

var oauth2 = new OAuth2(CLIENT_ID,
       CLIENT_SECRET, 
       API_HOST, 
       null,
       TOKEN_PATH, 
       null);

console.log(oauth2);

     oauth2.getOAuthAccessToken(
       '',
       {'grant_type':"bearer"},
       function (e, access_token, refresh_token, results){
       
       	res.setHeader('Content-Type', 'application/json');
    	

		request({
		  url: API_HOST + "/search",
		  method: 'GET',
		    headers: {
		        	"Authorization": "Bearer " + access_token
		      	},
			function(err, res, body) {
			  res.send("1");
			  console.log(res);
			}
		});

     });

  //res.render('index', { title: 'Express' });
});

module.exports = router;





/*
$.ajax(API_HOST + TOKEN_PATH, {
	    type: "POST",
	    data: {
	        grant_type: GRANT_TYPE,
	        client_id: CLIENT_ID,
	        client_secret: CLIENT_SECRET
	    },
	    contentType: "application/x-www-form-urlencoded",
	    dataType: "json",
	    success: function (data) {
	    	token = data.access_token;
	    	bearer = data.token_type;
	        console.log("token: " + data.access_token);

	    },
	    error: function () {
	        console.log("post call error");
	    }
	})*/

