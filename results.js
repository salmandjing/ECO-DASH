var fixedDriveDist ,fixedBusDist,walkDistanceInt,driveDistanceInt,busDistanceInt,homeEnergy,homeEnergyBus; 
var coalsBurned,coalsBurnedBus, smartphones, smartphonesBus;
var carHomeEnergyFootString,carCoalFootString,carSmartphoneString;
var busHomeEnergyFootString,busCoalFootString,busSmartphoneString;


var key = "INSERT_APIKEY_TO_OPENWEATHERMAP";

(() => {
    runPage();
})();

carFootprintCalc();
busFootprintCalc();


function getWeather(){
    
    link = "https://api.openweathermap.org/data/2.5/weather?zip=68521&units=metric&apikey="+key;
    var request = new XMLHttpRequest();
    request.open('GET',link,true);
    request.onload = function(){
     var obj = JSON.parse(this.response);

     if (request.status >= 200 && request.status < 400) {
        var temp = obj.main.temp;
        window.localStorage.setItem("temp",temp);
    }
   
}
request.send();
}

function fillBusHTMLPage(){

    busHomeEnergyFootString = homeEnergyBus;
    busCoalFootString = coalsBurnedBus;
    busSmartphoneString =  smartphonesBus;
   

   
   document.getElementById("iWalk").addEventListener('click', () => iWalk());
   document.getElementById("iDrive").addEventListener('click', () => iDrive());
   document.getElementById("iBus").addEventListener('click', () => iBus()); 
   
   var weather = window.localStorage.getItem("temp");
   var weatherInt = parseInt(weather);
   var walkDistVal = window.localStorage.getItem("walkDist")
   var walkDistInt = (parseFloat(walkDistVal))
   walkDistInt *= 0.621371;
   walkDistInt = walkDistInt.toFixed(2)

   
   if(weatherInt > 50){
    document.getElementById("walkInput").innerHTML = "The weather is :" + weatherInt + " degrees Fahrenheit. If you can you should walk. The distance is " + walkDistInt + " miles";
   }else if(weatherInt > 30 && weatherInt < 50){
    document.getElementById("walkInput").innerHTML = "The weather is " + weatherInt + " degrees Fahrenheit. Might be nippy. The distance is " + walkDistInt + " miles";
   }else if(weatherInt < 30){
    document.getElementById("walkInput").innerHTML = "The weather is " + weatherInt + " degrees Fahrenheit. I wouldn't walk. The distance is " + walkDistInt + " miles"+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
   }
   document.getElementById("busInput").innerHTML = fixedBusDist + " pounds" + busCoalFootString + " " + busHomeEnergyFootString + " " +busSmartphoneString;
   
   
}


function fillCarHTMLPage(){

     carHomeEnergyFootString = homeEnergy;
     carCoalFootString = coalsBurned;
     carSmartphoneString =  smartphones;
    

    document.getElementById("iWalk").addEventListener('click', () => iWalk());
    document.getElementById("iDrive").addEventListener('click', () => iDrive());
    document.getElementById("iBus").addEventListener('click', () => iBus()); 
    
    
  
    document.getElementById("driveInput").innerHTML = fixedDriveDist + " pounds" + carCoalFootString + " " + carHomeEnergyFootString + " " +carSmartphoneString;
   
    
    
}


function runPage(){

    walkString = window.localStorage.getItem("walk");
    driveString = window.localStorage.getItem("drive");
    busString = window.localStorage.getItem("transit");
    
    var temp1= "";
    var temp2= "";
    var temp3 = "";
    var temp4 = "";
    var temp5 = "";
    var temp6 = "";
    
    temp1, temp2 = walkString.split(" ",1);
    temp3,temp4 = driveString.split(" ",1);
    temp5,temp6 = busString.split(" ",1);
    
     
    
    var walkArrayVal = temp2.toString();
    walkDistanceInt = parseFloat(walkArrayVal);
    window.localStorage.setItem("walkDist",walkDistanceInt)

    var driveArrayVal = temp4.toString();
    driveDistanceInt = parseFloat(driveArrayVal);
    
    var busArrayVal = temp6.toString();
    busDistanceInt = parseFloat(busArrayVal);
    
    fixedDriveDist= (driveDistanceInt*.6110337).toFixed(2); 
    fixedBusDist = ((busDistanceInt*.6110337)/9.2).toFixed(2);
    
    window.localStorage.setItem("carFootprint",fixedDriveDist);
    window.localStorage.setItem("busFootprint",busDistanceInt);
    
}

function iWalk(){
    var start = window.localStorage.getItem("enteredLocation");
    var end = window.localStorage.getItem("end");

    window.location.href = "https://www.google.com/maps/dir/?api=1&origin=" + start +"&destination=" + end + "&travelmode=walking";  
}
function iDrive(){
    var start = window.localStorage.getItem("enteredLocation");
    var end = window.localStorage.getItem("end");

    window.location.href = "https://www.google.com/maps/dir/?api=1&origin=" + start +"&destination=" + end + "&travelmode=driving";  
}
function iBus(){
    var start = window.localStorage.getItem("enteredLocation");
    var end = window.localStorage.getItem("end");

    window.location.href = "https://www.google.com/maps/dir/?api=1&origin=" + start +"&destination=" + end + "&travelmode=transit";  
}

function carFootprintCalc() {
         
      // START homes energy calculation
      // Convert metric ton to how many days worth.

      var fpInMetricTons = window.localStorage.getItem("carFootprint")
    
      var days = fpInMetricTons/0.023
 
      // if less than a day
      if (days < 1) {
        var hours = days * 24
        if (hours < 1) {
          var minutes = hours * 60
          homeEnergy = Math.round(minutes) + " minutes worth of a home's energy use";
        }
        else if (hours == 1) {
          homeEnergy = hours.toFixed(2) + " hour worth of a home's energy use";
        } else {
          homeEnergy = hours.toFixed(2) + " hours worth of a home's energy use";
        }
        
      }
      
      // if more than a day
      if (days >= 1) {
        // if less than a month
        if (days < 30) {
          var roundedDays = Math.round(days);
            homeEnergy  = roundedDays + " days worth of a home's energy use";
        }

        // if more than a month but less than a year
        if (days > 30 && days < 365) {
          var months = days/30
           homeEnergy  = months.toFixed(2) + " months worth of a home's energy use";
        }

        // if more than a year
        if (days >= 365) {
          var years = days/365
          homeEnergy = years.toFixed(2) + " years worth of a home's energy use";
        }
      }
      // END homes energy calculation

      // START coals burned calculation
      var poundsBurned = fpInMetricTons/0.000915
      if (Math.round(poundsBurned) === 1) {
        coalsBurned = Math.round(poundsBurned) + " pound of coal burned";
      }
      else {
        coalsBurned = Math.round(poundsBurned) + " pounds of coal burned";
      }   
      // END coals burned calculation

      // START number of smartphones charged calculation
      var poundsBurned = fpInMetricTons/0.00000784
     smartphones = Math.round(poundsBurned) + " number of smartphones charged";
      // END number of smartphones charged calculation
      writeCarFootprintCalc();
     
    }

    function busFootprintCalc() {
         
        // START homes energy calculation
        // Convert metric ton to how many days worth.
  
        var fpInMetricTons = window.localStorage.getItem("busFootprint")
      
        var days = fpInMetricTons/0.023
   
        // if less than a day
        if (days < 1) {
          var hours = days * 24
          if (hours < 1) {
            var minutes = hours * 60
            homeEnergyBus = Math.round(minutes) + " minutes worth of a home's energy use";
          }
          else if (hours == 1) {
            homeEnergyBus = hours.toFixed(2) + " hour worth of a home's energy use";
          } else {
            homeEnergyBus = hours.toFixed(2) + " hours worth of a home's energy use";
          }
          
        }
        
        // if more than a day
        if (days >= 1) {
          // if less than a month
          if (days < 30) {
            var roundedDays = Math.round(days);
            homeEnergyBus  = roundedDays + " days worth of a home's energy use";
          }
  
          // if more than a month but less than a year
          if (days > 30 && days < 365) {
            var months = days/30
            homeEnergyBus  = months.toFixed(2) + " months worth of a home's energy use";
          }
  
          // if more than a year
          if (days >= 365) {
            var years = days/365
            homeEnergyBus = years.toFixed(2) + " years worth of a home's energy use";
          }
        }
        // END homes energy calculation
  
        // START coals burned calculation
        var poundsBurned = fpInMetricTons/0.000915
        if (Math.round(poundsBurned) === 1) {
          coalsBurnedBus = Math.round(poundsBurned) + " pound of coal burned";
        }
        else {
          coalsBurnedBus = Math.round(poundsBurned) + " pounds of coal burned";
        }   
        // END coals burned calculation
  
        // START number of smartphones charged calculation
        var poundsBurned = fpInMetricTons/0.00000784
       smartphonesBus = Math.round(poundsBurned) + " number of smartphones charged";
        // END number of smartphones charged calculation
        writeBusFootprintCalc();
        getWeather();
       
      }
      function writeCarFootprintCalc(){

        window.localStorage.setItem("busHomeEnergyFootString",homeEnergy)
       window.localStorage.setItem("busCoalFootString",coalsBurned)
       window.localStorage.setItem("busSmartphoneString",smartphones)
       fillCarHTMLPage();

    }  
    function writeBusFootprintCalc(){

        window.localStorage.setItem("busHomeEnergyFootString",homeEnergyBus)
       window.localStorage.setItem("busCoalFootString",coalsBurnedBus)
       window.localStorage.setItem("busSmartphoneString",smartphonesBus)
       fillBusHTMLPage();

    }