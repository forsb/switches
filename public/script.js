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

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Dogs');

      data.addRows([
        [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        [66, 70], [67, 72], [68, 75], [69, 80]
      ]);

      var options = {
        hAxis: {
          title: '',
          baselineColor: '#CCCCCC'
        },
        vAxis: {
          title: '',
          baselineColor: '#CCCCCC'
        },
        labels: 'none',
        width: '50%',
        height: '100%',
        backgroundColor: { fill:'transparent' },
        chartArea: {'width': '85%', 'height': '80%'},
        legend: 'none',
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
}
