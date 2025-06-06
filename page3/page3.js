let trains;
let trainStations=[];
function init(){
  $.ajaxSetup({async: false});
  
  let link = "http://localhost:8300";
  let route= "/trains";

  trains = $.getJSON(link+route).responseJSON;
  
  let search = document.getElementById('search');
  
  let build ="";
  
  

  // compiles a list of possible stations
   //library of stations for all trains (list of lists of stations)
  let word = "";
  let station = [];
  for (let i=0;i<23;i++){
    let train = trains[i];
    for (let i = 1; i<(train.stations).length;i++){
      if (train.stations[i] == ","){
        station.push(word);
        word= "";
        
      } else{
        if ((train.stations[i] == "]") && i==(train.stations).length-1){
          station.push(word);
          word="";
        } else if (train.stations[i] == "]"){
            word+=" ";
        } else{
          word+=train.stations[i];
        }
      }
    }
    trainStations.push(station);
    station=[];
  }
    
  

  for (let i = 0; i<trains.length;i++){
	  let train = trains[i];
    build += `<div class="buttons">`;
    build += `<img src="../home/trainImgs/${train.trainID}.png" id="subImg" onclick="trainInfo(${train.stationID})">`;
    build += `</div>`
  }
  
  search.innerHTML = build;
  
  }


function trainInfo(trainNum){
  let leftBody = document.getElementById("leftBody");
  //console.log(trainStations[trainNum-1]); //Gets list of one train stations
  let build = "";
  build+=`<img src="../home/trainImgs/${trains[trainNum-1].trainID}.png" >`;
  if (!(trains[trainNum-1].bound=="")){
    
    build+=`<p id="bound">${trains[trainNum-1].bound} Bound</p>`;
  }
  
  for (let i = 0;i<trainStations[trainNum-1].length;i++){
    build+=`<div class="lineMap">`;
    build+=`<p id="stop" onclick="deepSearch('${trainStations[trainNum-1][i]}',${trainNum})">${trainStations[trainNum-1][i]}</p>`;
    build+=`</div>`;
  }
  leftBody.innerHTML = build;

}

function deepSearch(stopNum,trainNum){
  let rightBody = document.getElementById("rightBody");
  let counter = 0;
  let build = "";
  build += `<p>Where To?</p>`
  build +=`<input placeholder="Enter Station" id='location'>`
  build +=`<button onclick="filter()">Search</button>`;
  build+=`<br>`;
  
  for (i=0;i<trainStations.length;i++){
    for (j=0;j<trainStations[i].length;j++){
      if (trainStations[i][j]==stopNum){
        if (!(trains[trainNum-1].trainID == trains[i].trainID)){
          
          counter+=1;
          build+=`<img src="../home/trainImgs/${trains[i].trainID}.png">`;
        }

      }
    }
  }
  if (!(counter==0)){
    build+=`<h1>Alternate trains that go to ${stopNum} under this bound</h1>`;
  } else{
    build+=`<h1>There are no other trains that go to ${stopNum} under this bound</h1>`
  }

  rightBody.innerHTML=build;
}

function filter(){
  let build="";
  let counter =0;
  let location = (document.getElementById("location").value).toLowerCase();

  build += `<p>Where To?</p>`
  build +=`<input placeholder="Enter Station" id='location'>`
  build +=`<button onclick="filter()">Search</button>`;
  build+=`<br>`;

  for (i=0;i<trainStations.length;i++){
      for (j=0;j<trainStations[i].length;j++){
        if ((trainStations[i][j]).toLowerCase()==location){
          counter+=1;
          build+=`<img src="../home/trainImgs/${trains[i].trainID}.png">`;
        }

      }
    }
    if (counter==0){
      build+=`<h1>There are no trains that go to ${(document.getElementById("location").value).toUpperCase()}, check for precise spelling</h1>`;

    } else{
      build+=`<h1>${counter} train(s) can go to ${(document.getElementById("location").value).toUpperCase()}</h1>`
    }

    rightBody.innerHTML = build;

  }


  