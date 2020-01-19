

function pageLoad() {
    getButton();
} 

(() => {
    getButton();



})();

function getButton() {

document.getElementById("Gobutton").addEventListener('click', () => mapsApiRequest()); 
 
}

function checkData(input){
  if(input = ""){
      alert("Can't leave it empty bro")
  }

}

// Sends location and destination to google maps distance matrix API to make request
function mapsApiRequest() {

  enteredLocation = 0;
 destination = 0; 

 enteredLocation = getLocation();
 destination = getDestination();
 

 checkData(enteredLocation);  //You need to make sure you have a good valur and if not display an error
 checkData(destination) ;

 getDistanceBus(enteredLocation,destination);  //Call your distance function
 getDistanceDrive(enteredLocation,destination);
 getDistanceWalk(enteredLocation,destination);
 //Call a function to display the results in the page.  //You could use a div tag at the bottom of the page that you fill in.
}

function getLocation(){
    
    var start = document.getElementById('enteredLocation').value;
    window.localStorage.setItem("enteredLocation",start)
    return document.getElementById('enteredLocation').value;
}

function getDestination(){
   var end = document.getElementById('destination').value;

    window.localStorage.setItem("end",end)
    return document.getElementById('destination').value;
}

function saveDistanceWalk(distanceValue){

window.localStorage.setItem("walk",distanceValue)

newPage();
}
function saveDistanceDrive(distanceValue){

    window.localStorage.setItem("drive",distanceValue)
    
    
    }
function saveDistanceTransit(distanceValue){

        window.localStorage.setItem("transit",distanceValue)
        
     
    }    

function newPage(){window.location.assign("results.html");}

//Find the distance

function getDistanceWalk(enteredLocation,destination){
  var distanceService = new google.maps.DistanceMatrixService();
  distanceService.getDistanceMatrix({
     origins: [enteredLocation],
     destinations: [destination],
     travelMode: google.maps.TravelMode.WALKING,
     unitSystem: google.maps.UnitSystem.METRIC,
     durationInTraffic: true,
     avoidHighways: false,
     avoidTolls: false
 },
 function (response, status) {
     if (status !== google.maps.DistanceMatrixStatus.OK) {
         console.log('Error:', status);
     } else {
        //console.log(response.rows[0].elements[0].distance);
       // console.log(response.rows[0].elements[0].duration);
       var distanceJson = response.rows[0].elements[0].distance.text;
        saveDistanceWalk(distanceJson);
    }
 })
 ;
}

function getDistanceDrive(enteredLocation,destination){
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
       origins: [enteredLocation],
       destinations: [destination],
       travelMode: google.maps.TravelMode.DRIVING,
       unitSystem: google.maps.UnitSystem.METRIC,
       durationInTraffic: true,
       avoidHighways: false,
       avoidTolls: false
   },
   function (response, status) {
       if (status !== google.maps.DistanceMatrixStatus.OK) {
           console.log('Error:', status);
       } else {
          //console.log(response.rows[0].elements[0].distance);
         // console.log(response.rows[0].elements[0].duration);
         var distanceJson = response.rows[0].elements[0].distance.text;
         saveDistanceDrive(distanceJson);
      }
   })
   ;
  }

  function getDistanceBus(enteredLocation,destination){
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
       origins: [enteredLocation],
       destinations: [destination],
       travelMode: google.maps.TravelMode.TRANSIT,
       unitSystem: google.maps.UnitSystem.METRIC,
       durationInTraffic: true,
       avoidHighways: false,
       avoidTolls: false
   },
   function (response, status) {
       if (status !== google.maps.DistanceMatrixStatus.OK) {
           console.log('Error:', status);
       } else {
          //console.log(response.rows[0].elements[0].distance);
         // console.log(response.rows[0].elements[0].duration);
         var distanceJson = response.rows[0].elements[0].distance.text;
        saveDistanceTransit(distanceJson);
      }
   })
   ;
  }
  