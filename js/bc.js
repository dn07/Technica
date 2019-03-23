//$(document).ready(function (){
//    $.get("http://139.59.23.108:3000/api/v1/client/state", (data)=>{
//        console.log(data)
//        $document.getElementById("block").innerHTML = 'You have created an event';
//    })
//})
$(document).ready(function(){
    $("#block").html('')
    $.get("http://139.59.23.108:3000/api/v1/client/state", (data)=>{
        data = JSON.parse(data)
        txt=""
        for(i=0;i<20;i++) {
           txt+="<div class='cards'><strong>Hash:</strong> "+data[i].hash+" <br><strong>Input:</strong> " +data[i].input+"<br><strong>Nonce:</strong> " +data[i].nonce + "<br><strong>GasPrice:</strong> " +data[i].gasPrice + "</div>";
            $("#block").append(txt)
        }
    })
})