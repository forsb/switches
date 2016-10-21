function test(){
    //alert('element');
    //httpAsync('GET', 'http://192.168.1.132:8081/resources/', null);
    //httpAsync('GET', 'http://' + window.location.hostname + ':8081/resources/', null, null);
    //httpAsync('GET', 'https://fonts.googleapis.com/css?family=Dosis', null);
}

function loadContent(){
    httpAsync('GET', 'http://' + window.location.hostname + ':8081/resources/', null, function (response){
        //alert(response);
        response = JSON.parse(response);
        for(i in response){
            addDeviceBox(response[i].first, response[i].second, response[i]._id);
        }
    });
}



function httpAsync(method, theUrl, params, callback){
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() { 
        if(xmlHttp.readyState == 4){
                    
            if (xmlHttp.status == 200){
                //success

                /*document.getElementById('hejhopp').innerText = 'success';

                var dummyResponse = `
                {
                    "id": 1
                    "name": "Device 1"
                    "type": "wallplug"
                    "protocol": "arctech"
                    "model": "codeswitch"
                    "parameters": {
                        "house": "A"
                        "unit": 1
                    }
                }`
                */
    
                console.log(this.responseText);
                callback(this.responseText);
            } else {
                //fail
                console.log('http request failed: ' + xmlHttp.status);
            }  
        }          
    }

    xmlHttp.open(method, theUrl, true); // true for asynchronous 
    xmlHttp.send(params);
}

function addDeviceBox(header, subheader, uid) {
    //var uid = Math.floor(Math.random() * 10000) + 1  
    var devicebox = document.createElement("div");
    devicebox.className = "deviceBox";

    var boxleft = document.createElement("div");
    boxleft.className = "boxleft";
    boxleft.innerHTML = '<span><img src="bulb.jpg" /></span>';

    var boxright = document.createElement("div");
    boxright.className = "boxright";
    boxright.innerHTML = ` 
    <span>
        <div class="onoffswitch">
            <input type="checkbox" name="switch` + uid + `"   class="onoffswitch-checkbox" id=switch` + uid + `" onchange="test()" checked>
            <label class="onoffswitch-label" for=switch` + uid + `" ></label>
        </div>
    </span>
    `;

    var boxmiddle = document.createElement("div");
    boxmiddle.className = "boxmiddle";
    boxmiddle.innerHTML = '<span><strong>'+ header + '</strong> <br /> ' + subheader + '</span>';

    devicebox.appendChild(boxmiddle);
    devicebox.appendChild(boxleft);
    devicebox.appendChild(boxright);
    var body = document.getElementById("bod");

    body.appendChild(devicebox);
}

function updateModels(box) {

}

function displayNew(){
    document.getElementById('newView').style.display = 'inline';
}