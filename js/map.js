console.log("im in map.js")
$(document).ready(function (){
    $("#load").click(function(e) {
        e.preventDefault();
        console.log("load has been created");
        searchloc();
    })
    function searchloc(){
        var name = document.getElementById("search")
        console.log("im in searchloc()")
        if(name.value.length == 0)
        {
            search = "VIT Vellore";
        }
        else{
            search = name.value;
        }
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+search+'&key=AIzaSyC4g5BpF0ntigP5d3LfulYDUUT0bxWvC54', function(data) {
            loc = data.results[0].geometry.location;
            map = new google.maps.Map(document.getElementById("map"),{
                center: loc,
                zoom: 18
            })
            mark = new google.maps.Marker({
                position: loc,
                map: map
            })
        });
    }
})