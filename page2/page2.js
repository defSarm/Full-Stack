let lines;
let schedules;
function init(){
  $.ajaxSetup({async: false});
  
  let link = "http://localhost:8300";
  let route= "/line";
  let route2="/schedule";
  lines = $.getJSON(link+route).responseJSON;

  schedules = $.getJSON(link+route2).responseJSON;
  
  let rightBody = document.getElementById('rightbody');
  let build ="";
  
 
  for (let i=0;i<lines.length;i++){
    let line = lines[i];
    let schedule = schedules[i];
    
    build += `<div class="infoCard">`;
    build+=`<div class="infoCard-inner">`;

    build += `<div class="front">`;
    build += `<img src=../home/trainImgs/${schedule.trainID}.png id="subImg">`;
    build += `<p>${schedule.trainID} Train</p>`
    build += `</div>`;

    build += `<div class="back">`;
    build += `<p>Station: ${line.station}</p>`;
    if (!(schedule.rushTime=="")){
        build += `<p>Rush Hour Time: ${schedule.rushTime} minutes</p>`;
    }
    if (!(schedule.expressTime=="")){
        build += `<p>Express Time: ${schedule.expressTime} minutes</p>`;
    } 
    build += `</div>`;

    build+=`</div>`;

	build += `</div>`;

  }
  
  rightBody.innerHTML = build;
 
}

function filterColor(){
    let colors = (document.getElementById('colorfilter').value).toLowerCase();
    let rightBody = document.getElementById('rightbody');
    let build ="";
  
    for (let i=0;i<lines.length;i++){
        let line = lines[i];
        let schedule = schedules[i];
        
        if (line.color == colors){
            build += `<div class="infoCard">`;
            build+=`<div class="infoCard-inner">`;

            build += `<div class="front">`;
            build += `<img src=../home/trainImgs/${schedule.trainID}.png id="subImg">`;
            build += `<p>${schedule.trainID} Train</p>`
            build += `</div>`;

            build += `<div class="back">`;
            build += `<p>Station: ${line.station}</p>`;
            if (!(schedule.rushTime=="")){
                build += `<p>Rush Hour Time: ${schedule.rushTime} minutes</p>`;
            }
            if (!(schedule.expressTime=="")){
                build += `<p>Express Time: ${schedule.expressTime} minutes</p>`;
            } 
            build += `</div>`;

            build+=`</div>`;

            build += `</div>`; 
        }

    }
    
    rightBody.innerHTML = build;
}


function filterType(){
    let types = (document.getElementById('trainfilter').value).toLowerCase();
    let rightBody = document.getElementById('rightbody');
    let build ="";
  
    for (let i=0;i<lines.length;i++){
        let line = lines[i];
        let schedule = schedules[i];
        
        if (line.type == types){
            build += `<div class="infoCard">`;
            build+=`<div class="infoCard-inner">`;

            build += `<div class="front">`;
            build += `<img src=../home/trainImgs/${schedule.trainID}.png id="subImg">`;
            build += `<p>${schedule.trainID} Train</p>`
            build += `</div>`;

            build += `<div class="back">`;
            build += `<p>Station: ${line.station}</p>`;
            if (!(schedule.rushTime=="")){
                build += `<p>Rush Hour Time: ${schedule.rushTime} minutes</p>`;
            }
            if (!(schedule.expressTime=="")){
                build += `<p>Express Time: ${schedule.expressTime} minutes</p>`;
            } 
            build += `</div>`;

            build+=`</div>`;

            build += `</div>`; 
        }

    }
    
    rightBody.innerHTML = build;
}
