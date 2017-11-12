//load modules from ArcGIS API for JS
require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!"
], function(Map, MapView) {

    var map = new Map({
    basemap: "topo"
  });

  var view = new MapView({
    container: "viewDiv",  // Reference to the DOM node that will contain the view
    map: map,           // References the map object created in step 3
    zoom: 11,  // Sets zoom level based on level of detail (LOD)
    center: [-87.769075, 41.890156] //long, lat
  });

});


//connect to Yelp in console
//Yelp results on map
//get lines & stations layers in map

//https://www.yelp.com/search?find_desc=restaurant&find_loc=Chicago%2C+IL&ns=1
//https://www.yelp.com/search?find_desc=restaurant&l=a%3A41.8750443%2C-87.62874579999999%2C81&ns=1


//https://stackoverflow.com/questions/41528407/i-am-trying-to-do-a-yelp-fusion-v3-api-call-in-javascript
var yelpRequest = $(function () {

	var API_HOST = "https://api.yelp.com";
	var SEARCH_PATH = "/v3/businesses/search";
	var BUSINESS_PATH = "/v3/businesses/";
	var TOKEN_PATH = "/oauth2/token";
	var GRANT_TYPE = "client_credentials";

	var CLIENT_ID = "yBSQxTfRYukNfg2kMSU4Sw";
	var CLIENT_SECRET = "8lGW6KoHT1V6AM4ykmLzg6l8CQwnfgW4A0RqaSCQ5tYi94Ws0nt6ULIEl0a09Gdw";

	var SEARCH_TERM = "food";
	var SEARCH_RADIUS = 500;        // radius is in meters
	var SORT_BY = "distance";


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
	    	var token = data.access_token;
	    	var bearer = data.token_type;
	        console.log("Inside: " + bearer);

	    },
	    error: function () {
	        console.log("post call error");
	    }
	})

/*Response:
{
  "access_token": "ACCESS_TOKEN",
  "token_type": "bearer",
  "expires_in": 15552000
}*/
//Please cache your access token so you get faster access to our data by eliminating an extra request for each API call.

//To authenticate API calls with the access token, set the Authorization HTTP header value as Bearer ACCESS_TOKEN.

/*	$.get("https://api.yelp.com/v3/businesses/search", function( results ) {
		headers: {
        	Authorization: bearer + token;
      };
		//Authorization: Bearer + ACCESS_TOKEN;
  console.log("Got em");
  //alert( "Load was performed." );
*/


  	
	$.ajax(API_HOST + SEARCH_PATH, {
	    type: "GET",
	    contentType: "application/x-www-form-urlencoded",
	    dataType: "json",
	    headers: {
        	Authorization: "bearer" + "8lGW6KoHT1V6AM4ykmLzg6l8CQwnfgW4A0RqaSCQ5tYi94Ws0nt6ULIEl0a09Gdw"
      	},
      	
	    success: function (results) {

	        console.log(results);

	    },
	    error: function () {
	        console.log("get call error");
	    }
	})


});


//Installed 'Allow-Control-Allow-Origin: *' Chrome plug-in as workaround
//Article re. using Yelp on front end: https://github.com/builderLabs/Yelp-Fusion-JavaScript/blob/master/yelpFusionJS.md



