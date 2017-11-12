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
	var token;
	$.get('http://localhost:3000',function(data){
		token: data.token;
		console.log(data);
	});

/*Response:
{
  "access_token": "ACCESS_TOKEN",
  "token_type": "bearer",
  "expires_in": 15552000
}*/	
	$.ajax('https://www.yelp.com/search', {
	    type: "GET",
	    dataType: "jsonp",
	    jsonCallback: "cb",
	    headers: {
        	"Authorization": "Bearer " + token
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



