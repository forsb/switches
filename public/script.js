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

function getCurrentData(){
    httpAsync('GET', 'http://' + window.location.hostname + ':8081/resources/')
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

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'X');
      data.addColumn('number', 'Dogs');

      data.addRows([
        [[8, 30, 0], 5],
        [[9, 0, 0], 10],
        [[10, 0, 0, 0], 12],
        [[10, 45, 0, 0], 13],
        [[11, 0, 0, 0], 15],
        [[12, 15, 45, 0], 20],
        [[13, 0, 0, 0], 22],
        [[14, 30, 0, 0], 25],
        [[15, 12, 0, 0], 30],
        [[16, 45, 0], 32],
        [[16, 59, 0], 42]
      ]);

      var options = {
        hAxis: {
          title: '',
          baselineColor: '#CCCCCC',
          textPosition: 'in'
        },
        vAxis: {
          title: '',
          baselineColor: '#CCCCCC'
        },
        
        width: '50%',
        height: '100%',
        backgroundColor: { fill:'transparent' },
        chartArea: {'width': '85%', 'height': '85%'},
        legend: 'none',
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
}
