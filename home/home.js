let lineType;
function init(){
  $.ajaxSetup({async: false});
  
  let link = "http://localhost:8300";
  let route= "/routes";
  lineType = $.getJSON(link+route).responseJSON;
  
  let rightBody = document.getElementById('rightBody');
  let build ="";
  
 
  for (let i=0;i<lineType.length;i++){
    let line = lineType[i];
    
    build += `<div class="infoCard">`;
    build += `<img src=../home/trainImgs/${line.trainID}.png id="subImg">`;
    build += `<p>${line.trainID} Train</p>`

    
    if (line.express == "true"){
        build+= `<p id=expressSign>Available Express: yes</p>`;
    } else{
        build+= `<p id=expressSign>Available Express: no</p>`;
    }
    
	  build += `</div>`;
  }
  
  rightBody.innerHTML = build;
 
}
