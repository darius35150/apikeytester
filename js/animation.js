/*******************************************************************************
****Program Title:   Google Maps Test                                          *
****Company:         Holley Software, Inc.                                     *
****Document Name:   animation.js                                              *
****Author:          Darius Holley                                             *
****Date Deployed:   November 18, 2018                                         *
****Department:      Any                                                       *
****Description:     This file is made for animations needed for the UI        *
****                                                                           *
********************************************************************************
*/

const OPTION_SELECTION_MAPPING = "Google Mapping";
const OPTION_SELECTION_GEOCODE = "Google Geocode";
const OPTION_SELECTION_STATIC = "Google Static Map";
const OPTON_SELECTION_DIRECTIONS = "Google Directions";
const OPTION_SELECTION_KEY_COMPARE = "Key Compare";

$(document).ready(function(){
    $("#map").hide();
    $("#addressForm").hide();
    $("#ipaddress").hide();
    $("#contactform").hide();
});

$(function(){
    $("#dropdown").change(function(){
        let dropMenuValueText = $(this).find("option:selected").text();
        
        if(dropMenuValueText === OPTION_SELECTION_GEOCODE){
            $("#map").hide();
            $("#comparefield").hide();
            $("#addressForm").fadeIn();
            $("img").remove();
            $("#newKey").show();
            $("label").show();
            changeAddressLabel(dropMenuValueText);
        }
        else if(dropMenuValueText === OPTION_SELECTION_MAPPING)
        {
            $("#map").hide();
            $("#addressForm").hide();
            $("img").remove();
            $("#newKey").show();
            $("label").show();
            changeAddressLabel(dropMenuValueText);
        }
        else if(dropMenuValueText === OPTION_SELECTION_STATIC)
        {
            $("#map").hide();
            $("#addressForm").fadeIn();
            $("#comparefield").hide();
            $("#newKey").show();
            $("label").show();
            changeAddressLabel(dropMenuValueText);
        }
        else if(dropMenuValueText === OPTION_SELECTION_KEY_COMPARE)
        {
            $("#map").hide();
            $("#addressForm").fadeIn();
            $("#comparefield").fadeIn();
            $("#newKey").hide();
            $("label").hide();
            $("img").hide();
            changeAddressLabel(dropMenuValueText);
        }
        else
        {
            $("#map").hide();
            $("#addressForm").hide();
            $("img").hide();
            changeAddressLabel(dropMenuValueText);
        }
    });
});

$(function(){
    $("#tester").click(function(){
        $("#ipaddress").hide();
        $("#contactform").hide();
        $("#testerpage").show();
    });
    $("#ip").click(function(){
        $("#testerpage").hide();
        $("#contactform").hide();
        $("#map").hide();
        $("img").hide();
        $("#ipaddress").show();
    })
    $("#contact").click(function(){
        $("#testerpage").hide();
        $("#ipaddress").hide();
        $("#map").hide();
        $("img").hide();
        $("#contactform").show();
    })
});

const changeAddressLabel = (dropMenuValueText) =>{

    if(dropMenuValueText === OPTION_SELECTION_KEY_COMPARE)
    {
        let fieldScript = document.getElementById("addressNum");
        fieldScript.placeholder = "Place 1st Key to compare";
    }
    else
    {
        let fieldScript = document.getElementById("addressNum");
        fieldScript.placeholder = "Place Address, or Name of a Location Here";
    }
}