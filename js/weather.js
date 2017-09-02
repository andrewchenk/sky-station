/*jslint browser: true*/
/*global $, jQuery, alert*/
//Get Weather button event
//interaction with DarkSky
var weather = (function($, google, moment) {
    // "globals" 
    var lat; 
    var long; 
    var city_name; 
    var location; 
    
    function weatherReport(latitude, longitude) {
        var apiKey = '419d6044ee82c0f5f8bd391e0ec3834e',
            url = 'https://api.darksky.net/forecast/',
            lati = latitude,
            longi = longitude,
            api_call = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";

        $.getJSON(api_call, function(forecast) {
            var currentDate = new moment(forecast.currently.time * 1000);
            $('#app').append('<p>' + currentDate.format() + '</p>');
            $('#app').append('<p> The temperature is ' + forecast.currently.temperature + '</p>');
            $('#app').append('<p> The weather is ' + forecast.currently.summary + '</p>');
        });
    }

    $('#get-weather').on('click', function(e) {
        lat = $('#latitude').val();
        long = $('#longitude').val();
        city_name = $('#city-search').val();

        // If the latitude and longitude inputs aren't empty
        // then continue with the code. Otherwise report error to user.
        if (lat && long !== '') {

            // prevent the default event 
            e.preventDefault();

            // Fade the form out, submit the weather request,
            // inject "new forecast" button, city name & forecast cards.
            $('.form').fadeOut(100, function() {
                if (city_name !== '') {
                    location = city_name;
                } else {
                    location = lat + ', ' + long;
                }
                $('#app').append('<p>This is ' + location);
                weatherReport(lat, long);
                $('#refresh').append('<button id="back">New Forecast</button>');

            });
        }
    });


    $('body').on('click', '#back', function() {
        window.location.reload(true);
    })

    // Search box method
    function initGoogleAPI() {
        var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));

        autocomplete.addListener('places_changed', function() {
            var place = autocomplete.getPlaces()[0];
            $("#latitude").val(place.geometry.location.lat());
            $("#longitude").val(place.geometry.location.lng());
        });
    }

    initGoogleAPI();
}($, google, moment))