//load modules from ArcGIS API for JS
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/widgets/Locate",
  "esri/layers/FeatureLayer",
  "dojo/domReady!"
], function(Map, MapView, Graphic, Point, SimpleMarkerSymbol, Locate, FeatureLayer) {

  var map = new Map({
    basemap: "topo"
  });

  var view = new MapView({
    container: "viewDiv",  // Reference to the DOM node that will contain the view
    map: map,           // References the map object created in step 3
    zoom: 11,  // Sets zoom level based on level of detail (LOD)
    center: [-87.769075, 41.890156] //long, lat
  });

  var locateBtn = new Locate({
    view: view
  });

  // Add the locate widget to the top left corner of the view
  view.ui.add(locateBtn, {
    position: "top-left"
  });

  var locateWidget = new Locate({
    viewModel: { // autocasts as new LocateViewModel()
      view: view,  // assigns the locate widget to a view
      graphic: new Graphic({
        symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
        // graphic placed at the location of the user when found
      })
    }
  });

  var staPopTemplate = {
  // ZIP is the name of a field in the service containing the zip code number of the feature
    title: "{STA_DESC_N}"
  };

  var linePopTemplate = {
  // ZIP is the name of a field in the service containing the zip code number of the feature
    title: "{Name}"
  };

  var featureLayerLines = new FeatureLayer({
    url: "https://services6.arcgis.com/Wd9JN4VBanznW8Yf/arcgis/rest/services/CTA_Lines/FeatureServer",
    popupTemplate: linePopTemplate
  });
  var featureLayerStations = new FeatureLayer({
    url: "https://services6.arcgis.com/Wd9JN4VBanznW8Yf/arcgis/rest/services/CTA_Stations/FeatureServer",
    popupTemplate: staPopTemplate
  });

  map.add(featureLayerLines);
  map.add(featureLayerStations);

  $("a.navbar-brand").on("click", function(){
    view.goTo({
     zoom: 11,
     center: [-87.769075, 41.890156] 
    });
  })

var menuLine;  

$(document).on("click", ".lineList li:not(:first-of-type)", function(){
 
  var lineSelect = $(this).attr('id');
  $(".lineList").hide();
  $(".staList").show();

  //loop thru menuArr to find matching Line
  for (var i = 0; i < menuArr.length; i++) {
    if (menuArr[i].line == lineSelect) {
      menuLine = menuArr[i];
      //looping should stop once match is found
    } 
  }
  $("ul.list-group.staList").html('');
  //Line name as first item in line menu;

  $("ul.list-group.staList").append("<li class='list-group-item first " + menuLine.line + "'><span class='esri-icon-down-arrow' aria-label='expanded icon'></span> " + menuLine.line + " Line </li>");

  $("ul .first").on("click",function(){
    $(".staList").hide();
    $(".lineList").show();
  });

  for (var j = 0; j < menuLine.stations.length; j++) {
    //store ref to station id in #id (sta_name is not unique, even within a single line), for grabbing lat/long
    $('ul.staList').append("<li class='list-group-item' id='" + menuLine.stations[j].id + "'>" + menuLine.stations[j].sta_name + "</li>");
  }

});
  
$(document).on("click", ".staList li:not(:first-of-type)", function(){
  $(".staList li").removeClass("staActive");
  $(this).addClass("staActive");

  var staSelectId = parseInt($(this).attr('id'));

  //for loop below won't assign object to this, so assigned lat & long directly to variables
  //var staSelect; 

  var staLat;
  var staLong;
  var pointGraphic;

  view.graphics.removeAll();

  for (var i = 0; i < menuLine.stations.length; i++) {
      if (menuLine.stations[i].id == staSelectId){
      staLat = menuLine.stations[i].lat;
      staLong = menuLine.stations[i].long;  
  }}
 
  function getData() {

    $.get('http://gafinal.herokuapp.com/?term=restaurant&latitude=' + staLat + '&longitude=' + staLong + '&radius=804&limit=10',function(data){

      var results = data.businesses;

      for (var i=0; i < results.length; i++){

        var attributes = {
          Name: results[i].name,
          Category: results[i].categories[0].title,
          Address: results[i].location.address1 + ", " + results[i].location.city,
          Distance: results[i].distance * 0.000621371,
          Rating: results[i].rating,
          Link: "<a href = " + results[i].url + "><img src = 'img/yelp_logo/yelp_trademark_RGB_outline.png'></a>"
        };

        switch(attributes.Rating){
          case 0:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_0.png'>";
              break;
           case .1:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_1.png'>";
              break;
          case 1.5:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_1_half.png'>";
              break;
          case 2:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_2.png'>";
              break; 
          case 2.5:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_2_half.png'>";
              break; 
          case 3:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_3.png'>";
              break;
           case 3.5:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_3_half.png'>";
              break;
          case 4:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_4.png'>";
              break;
          case 4.5:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_4_half.png'>";
              break; 
          case 5:
            attributes.Rating = "<img src = 'img/yelp_stars/regular/regular_5.png'>";
              break; 
          default:
            attributes.Rating = "";
            break;                         
        };

        attributes.Rating += "<br><p style='color:dark-gray;font-size:.8em;'>Based on " + results[i].review_count + " Reviews</p>";

        // Create pop-up template
        var popupTemplate = {
          title: "{Name}",
          content: [{
            type: "fields",
            fieldInfos: [{  
              fieldName: "Category",
              label: "Category",
              visible: true
            }, {
              fieldName: "Address",
              label: "Address",
              visible: true
            }, {
              fieldName: "Distance",
              label: "Distance from station (mi)",
              visible: true,
              format: {
                places: 2 // Sets the number of decimal places to 0 and rounds up
              }
            }, {
              fieldName: "Rating",
              label: "Yelp Rating",
              visible: true
            }, {
              fieldName: "Link",
              label: "Click logo for details",
              visible: true
            }
            ]
          }]
        };

        // Create a point
        var point = new Point({
          longitude: results[i].coordinates.longitude, 
          latitude: results[i].coordinates.latitude, 
        });

        var textSymbol = {
          type: "text",  // autocasts as new TextSymbol()
          color: "#C41235",
          text: "\ue61d", // esri-icon-map-pin
          font: { // autocast as esri/symbols/Font
            size: 20,
            family: "CalciteWebCoreIcons"
          }
        };

        // Create a graphic and add the geometry and symbol to it
        var restPoints = new Graphic({
          geometry: point,
          symbol: textSymbol,
          attributes: attributes,
          popupTemplate: popupTemplate
        });

        // Add the graphic to the view
        view.graphics.add(restPoints);

//end of for loop
      };

      view.then(function(evt) {
        view.goTo({
           target:view.graphics,
           zoom: 14
        });
      });

//end of get          
    });
 
//end of getData
  };

getData();

});
   
});

$(document).ready(function(){
  var winHeight = $(window).height()-50;
  $('#viewDiv').css('height', winHeight);
  $('.panel').css('height', winHeight);
  //$('#viewDiv').css('height', $(window).height()-50);
})