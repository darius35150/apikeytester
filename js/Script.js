/*******************************************************************************
****Program Title:   Google Maps Test                                          *
****Company:         Holley Software, Inc.                                     *
****Document Name:   Script.js                                                 *
****Author:          Darius Holley                                             *
****Date Deployed:   August 12, 2018                                           *
****Department:      Any                                                       *
****Description:     This file is made for performing specific tests.          *
****                                                                           *
********************************************************************************
*/

let testType = "";
let hasSubmittedMoreThanOnce = false;
let staticMapSubmittedMoreThanOnce = false;
let scriptAlreadyExists = false;
const OPTION_VALUE_MAPPING = "mapping";
const OPTION_VALUE_GEOCODE = "geocode";
const OPTION_VALUE_STATIC = "static";
const OPTION_VALUE_DIRECTIONS = "directions";
const OPTION_VALUE_KEY_COMPARE = "comparator";
const OPTION_VALUE_BLANK = "blank";

const submitTextBox = () => {

  testType = whatTypeOfTest();

  console.log(testType);

  let key = document.getElementById('newKey').value;
  let comparefield1 = document.getElementById("addressNum").value;
  let comparefield2 = document.getElementById("comparefield").value;

  if (!testMeetsQualifications(key) || testType != OPTION_VALUE_KEY_COMPARE)
  {
    if(testType === OPTION_VALUE_BLANK && key === "")
    {
      alert('Please enter a key and select a test type to continue');
      return;
    }
    else if(testType === OPTION_VALUE_BLANK && key != "")
    {
      alert('Please select a test type to continue');
      return;
    }
    else if(testType != OPTION_VALUE_BLANK && key === "")
    {
      alert('Please enter a key to continue');
      return;
    }
  }
  else
  {
    if(comparefield1 === "" || comparefield2 === "")
    {
      alert("Please enter a key to compare");
      return;
    }
  }

  if (testType === OPTION_VALUE_MAPPING || testType === OPTION_VALUE_DIRECTIONS) {
    performMappingTest(key);
  }
  else if (testType === OPTION_VALUE_GEOCODE) {
    performGeocodeTest(key);
  }
  else if(testType === OPTION_VALUE_STATIC){
    performStaticTest(key);
  }
  else if(testType === OPTION_VALUE_KEY_COMPARE)
  {
    performeKeyTest(comparefield1, comparefield2);
  }
}

const whatTypeOfTest = () => {
  testType = $("#dropdown").find("option:selected").val();
  return testType;
}

const performMappingTest = (key) => {

  key = key.trim();
  let scriptTag;
  console.log(key + "*");
  $("#script").remove();
  if (key && hasSubmittedMoreThanOnce) {
    hasSubmittedMoreThanOnce = false;
    $(".keyScript").remove();
    scriptTag = document.createElement('script');
    scriptTag.src = "https://maps.googleapis.com/maps/api/js?key=" + key + "&callback=customerMap";
    scriptTag.type = "text/javascript";
    scriptTag.className = "keyScript";
    document.body.appendChild(scriptTag);

    scriptAlreadyExists = true;
  }
  else if (key) {
    hasSubmittedMoreThanOnce = true;
    if(scriptAlreadyExists)
    {
      $(".keyScript").remove();
    }
    scriptTag = document.createElement('script');
    scriptTag.src = "https://maps.googleapis.com/maps/api/js?key=" + key + "&callback=customerMap";
    scriptTag.type = "text/javascript";
    scriptTag.className = "keyScript";
    scriptAlreadyExists = false
    document.body.appendChild(scriptTag);
  }
}

const performGeocodeTest = (key) => {
  
  const goolgeRequest = new XMLHttpRequest();

  key.trim()

  let response;
  let addressNum = document.getElementById("addressNum").value;

  if(addressNum === "")
  {
    alert('Please enter the name of a location, or an address to continue');
    return;
  }

  let url = "https://maps.googleapis.com/maps/api/geocode/xml?address=" + addressNum + "&key=" + key;
  console.log(url);
  goolgeRequest.open("GET", url);
  goolgeRequest.send();

  goolgeRequest.onreadystatechange = e => {
    console.log(goolgeRequest.responseText);
    response = goolgeRequest.responseText;
    $("#map").show();
    document.getElementById("map").innerHTML = response;
  }
}

const performStaticTest = (key) => {

  const goolgeRequest = new XMLHttpRequest();
  
  key.trim()
  
  let addressNum = document.getElementById("addressNum").value;

  if(addressNum === "")
  {
    alert('Please enter the name of a location, or an address to continue');
    return;
  }

  const url = "https://maps.googleapis.com/maps/api/staticmap?center=+" + addressNum + "&zoom=13&size=900x500&maptype=roadmap" +
    "&markers=color:green%7Clabel:" + addressNum + "&key=" + key;
    console.log(url);
    goolgeRequest.open("GET", url);
    goolgeRequest.send();
    goolgeRequest.onreadystatechange = e => {
    if(goolgeRequest.readyState === 4 && goolgeRequest.status === 200 && staticMapSubmittedMoreThanOnce){
      staticMapSubmittedMoreThanOnce = false;
      $("img").remove();
      let staticMap = document.createElement("img");
      console.log(goolgeRequest);
      staticMap.src = goolgeRequest.responseURL;
      staticMap.style.width = "900px";
      staticMap.style.height = "500px";
      staticMap.style.marginTop = "5px";
      staticMap.style.marginLeft = "375px";
      document.body.appendChild(staticMap);
    }
    else
    {
      staticMapSubmittedMoreThanOnce = true;
      let staticMap = document.createElement("img");
      console.log(goolgeRequest);
      staticMap.src = goolgeRequest.responseURL;
      staticMap.style.width = "900px";
      staticMap.style.height = "500px";
      staticMap.style.marginTop = "5px";
      staticMap.style.marginLeft = "375px";
      document.body.appendChild(staticMap);
    }
  }
}

const performeKeyTest = (comparefield1, comparefield2) =>{
  if(comparefield1 === comparefield2)
  {
    alert("The two keys are a match!");
  }
  else
  {
    alert("The two keys do not match!");
  }
}

const getIpAddress = () =>{
  const ipifyRequest = new XMLHttpRequest();
  const url = "https://api.ipify.org";

  ipifyRequest.open("GET", url);
  ipifyRequest.send();

  ipifyRequest.onreadystatechange = e => {
    let response = ipifyRequest.response;
    document.getElementById("showaddress").innerHTML = response;
  }
}

function helpMenu(){
  var helpModal = document.getElementById("helpMenu");
  var helpClose = document.getElementsByClassName("close")[0];
  var helpButton = document.getElementById("helpButton");

  helpButton.onclick = function(){
    helpModal.style.display = "block";
  }
  
  helpClose.onclick = function(){
    helpClose.style.display = "none";
  }

  window.onclick = function(event){
    if(event.target === helpModal)
    {
      helpModal.style.display = "none";
    }
  }
}

const testMeetsQualifications = (key) =>{

  return (key != "" && testType != OPTION_VALUE_BLANK) || testType === OPTION_VALUE_KEY_COMPARE;

}
/**************************************************************************
 * This section is for displaying markers on the map for Google.          *
 **************************************************************************
 */

function customerMap(){
  $("#map").show();
  
  let typeOfTest = whatTypeOfTest();

  let canvas = document.getElementById("map");
  let options = {
    center: new google.maps.LatLng(37.09, -95.71),
    zoom: 4
  };

  if(typeOfTest != OPTION_VALUE_DIRECTIONS)
  {

    //Setting up individual makers locations.
    let albanyCoMarker = new google.maps.LatLng(42.75, -73.82);
    let albanyMarker = new google.maps.Marker({
      position: albanyCoMarker
    });

    let blackHawkCountyMarker = new google.maps.LatLng(42.49, -92.33);
    let blackHawkMarker = new google.maps.Marker({
      position: blackHawkCountyMarker
    });

    let cobbADCMarker = new google.maps.LatLng(33.90, -84.57);
    let cobbADMarker = new google.maps.Marker({
      position: cobbADCMarker
    });

    let cobbCourtsMarker = new google.maps.LatLng(33.95, -84.54);
    let cobbCouMarker = new google.maps.Marker({
      position: cobbCourtsMarker
    });

    let cuyahogaCoMarker = new google.maps.LatLng(41.492778, -81.620449);
    let cuyahogaMarker = new google.maps.Marker({
      position: cuyahogaCoMarker
    });

    let jeffersonCoMarker = new google.maps.LatLng(33.522479, -86.80923);
    let jeffersonMarker = new google.maps.Marker({
      position: jeffersonCoMarker
    });

    let mecklenburgCoMarker = new google.maps.LatLng(35.315035, -80.845942);
    let mecklenburgMarker = new google.maps.Marker({
      position: mecklenburgCoMarker
    });

    let metroWestMarker = new google.maps.LatLng(25.809507, -80.418034);
    let metroMarker = new google.maps.Marker({
      position: metroWestMarker
    });

    let tgkMiamiMarker = new google.maps.LatLng(25.775253, -80.196662);
    let tgkMarker = new google.maps.Marker({
      position: tgkMiamiMarker
    });

    let map = new google.maps.Map(canvas, options);

    albanyMarker.setMap(map);
    blackHawkMarker.setMap(map);
    cobbADMarker.setMap(map);
    cobbCouMarker.setMap(map);
    cuyahogaMarker.setMap(map);
    jeffersonMarker.setMap(map);
    mecklenburgMarker.setMap(map);
    metroMarker.setMap(map);
    tgkMarker.setMap(map);
  }
  else
  {
    $("#map").show();
    let map = new google.maps.Map(canvas, options);
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: { strokeWeight: 3 }});

    let cobbGA = new google.maps.LatLng(33.90, -84.57);
    let blackHawkIA = new google.maps.LatLng(42.49, -92.33);

    directionsDisplay.setMap(map);
    let request = {
      origin: cobbGA,
      destination: blackHawkIA,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, function(response, status){
      if(status == "OK")
      {
        directionsDisplay.setDirections(response);
      }
      else
      {
        window.alert("Directions request failed dud to " + status);
      }
    });
  }
  
}

getIpAddress();