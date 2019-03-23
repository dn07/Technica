$(document).ready(function (){
    
//    $.get("http://139.59.23.108:5000/view", (data)=>{
//        mark = new google.maps.Marker({
//                            position: new google.maps.LatLng(data[0]['lat'], data[0]["lng"]),
//                            map: map,
//                            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
//                        })
//    })
    $("#load").click(function(e) {
        e.preventDefault();
        searchloc();
    })
    function searchloc(){
        var name = document.getElementById("search")
        var rad = document.getElementById("rad")
        if(name.value.length == 0)
        {
            search = "VIT Vellore";
        }
        else{
            search = name.value;
        }
        if(rad.value.length == 0)
        {
            radius = 10;
        }
        else{
            radius = rad.value;
        }
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+search+'&key=AIzaSyAWLKdkzzWoP5enV4Ap5SCcQXIqAW6K0-0', function(data) {
            loc = data.results[0].geometry.location;
            map = new google.maps.Map(document.getElementById("map"),{
                center: loc,
                zoom: 18
            })
            mark = new google.maps.Marker({
                position: loc,
                map: map
            })
            if(loc.lat==22.572646 && loc.lng==88.36389500000001){
                mark = new google.maps.Marker({
                    position: new google.maps.LatLng(22.572720, 88.3639400),
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                })
            }
            console.log(radius);
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: loc,
                radius: parseFloat(radius)
            });
            points = []
            var i=0;
            for(i=1;i<=50;i++){
                ty = loc.lng + radius*Math.sin(Math.PI*i/25);
                tx = loc.lat + radius*Math.cos(Math.PI*i/25);
                points[i-1] = {"lat":tx,"lng":ty};
            }
            input = JSON.stringify({
                "central": {
                    "lat": loc.lat,
                    "lng": loc.lng
                },
                "boundaries": points
            })
            console.log(input)
            $.ajax({
                type: "POST",
                headers: {"Content-Type":"application/json"},
                url: "http://139.59.23.108:5000/api",
                data:input
            }).done(function (data) {
                if(loc.lat==22.572646 && loc.lng==88.36389500000001 && radius>6)
                    alert(data);      
//                mark = new google.maps.Marker({
//                            position: new google.maps.LatLng(loc[i][0], location[i][1]),
//                            map: map,
//                            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
//                        })
            });
//            $.get("http://139.59.23.108:5000/view", (data)=>{
////                    console.log(data);
//                    location=[]
//                    for(i=0; i<data.length;i++)
//                        location[i]=[data[i].lat,data[i].lng]
//                })
//                for(i=0;i<data.length;i++)
//                    {
//                        mark = new google.maps.Marker({
//                            position: new google.maps.LatLng(location[i][0], location[i][1]),
//                            map: map,
//                            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
//                        })
//                    }
          
        });
    }
})