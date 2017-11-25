var express = require('express');
var OAuth2 = require('OAuth').OAuth2;
var request = require('request');
var rp = require('request-promise');
var querystring = require('querystring');

var router = express.Router();

var API_HOST = "https://api.yelp.com";
var SEARCH_PATH = "/v3/businesses/search";
var BUSINESS_PATH = "/v3/businesses/";
var TOKEN_PATH = "/oauth2/token";
var GRANT_TYPE = "client_credentials";

var CLIENT_ID = "";
var CLIENT_SECRET = "";

var my_access_token;

router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader('Content-Type', 'application/json');

	next();
});

var oauth2 = new OAuth2(CLIENT_ID,
	CLIENT_SECRET, 
	API_HOST, 
	null,
	TOKEN_PATH, 
	null);

oauth2.getOAuthAccessToken(
	'',
	{'grant_type':"bearer"},
	function (e, access_token, refresh_token, results){
		my_access_token = access_token;
	}
);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(querystring.stringify(req.query));
  rp({
      url: API_HOST + SEARCH_PATH + "?" + querystring.stringify(req.query),
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + my_access_token
      }
  })
  .then(function(response) {
    res.send(response);
  })
  .catch(function(err) {
    console.log('error');
  });
});

module.exports = router;
