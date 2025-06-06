let lineType;
function init(){
  $.ajaxSetup({async: false});
  
  let link = "http://localhost:8300";
  let route= "/routes";
  lineType = $.getJSON(link+route).responseJSON;
  
  let leftbody1 = document.getElementById('leftbody1');
  let build ="";
  
 
  for (let i=0;i<lineType.length;i++){
    let line = lineType[i];
    
    build += `<div class="button">`;
    build += `<img src=../home/trainImgs/${line.trainID}.png id="subImg" onclick="info('${line.trainID}')">`;
	build += `</div>`;
  }
  
  leftbody1.innerHTML = build;
 
}

function info(trainID){
    //rightbody

    let rightbody = document.getElementById('rightbody');
    let build = "";


    build+=`<p id=trainTitle>${trainID} Train Route</p>`;
    build+=`<img src=../page1/Routes/${trainID}.png id="trainLine">`;
    build+=`<br>`;
    
    for (let i=0;i<lineType.length;i++){
        let line = lineType[i];
        if (line.trainID == trainID){
            build+=`<p id="lineID">Line ID: ${line.lineID}</p>`;
        }
    }

    rightbody.innerHTML = build;

    // leftbody2

    let leftbody2 = document.getElementById('leftbody2');
    let build2='<p id="lb2Title">Additional Information</p>';

    for (let i=0;i<lineType.length;i++){
        let line = lineType[i];
        if (line.trainID == trainID){
            build2+=`<p id=infoL>Borough: ${line.borough}</p>`;
            build2+=`<p id="infoL">Total Stations: ${line.stations}</p>`;
            if (line.express == 'true'){
                build2+=`<p id=infoL>Express Line: yes</p>`;
            } else{
                build2+=`<p id=infoL>Express Line: no</p>`;
            }
        }
    }

    leftbody2.innerHTML = build2;

}
