var Array = []

function init(){
    if(localStorage.record){
        document.getElementById("list").innerHTML = "";
        Array = JSON.parse(localStorage.record);
        for(var i = 0; i<Array.length;i++){
            preparetable(i,Array[i].sdate,Array[i].stime,Array[i].etime,Array[i].task)
        }
    }
}

function OnSubmit(){
    if(checkDate() == true && checkTime() == true &&  checkTask() == true){
        add();
    }
    else{
        alert("cannot added")
    }
}

function add(){
    var sdate = document.querySelector('input[type="date"]').value;
    var stime = document.getElementById('stime').value;
    var etime = document.getElementById('etime').value;
    var task = document.getElementById('task').value;

    var obj = {sdate: sdate, stime:stime, etime:etime, task:task}
    if(selectedIndex === -1){
        Array.push(obj);
    }else{
        Array.splice(selectedIndex, 1, obj)
    }
    localStorage.record = JSON.stringify(Array);

    init();
    OnClear();
    SetDate();
    SetTime();
}

function preparetable(index, sdate, stime, etime, task){
    var table = document.getElementById("list");
    var row = table.insertRow();

    var sdatecell = row.insertCell(0);
    var stimeCell = row.insertCell(1);
    var etimeCell = row.insertCell(2);
    var taskCell = row.insertCell(3);
    var minuteCell = row.insertCell(4);
    var actionCell = row.insertCell(5)

    sdatecell.innerHTML = sdate;
    stimeCell.innerHTML = stime;
    etimeCell.innerHTML = etime;
    taskCell.innerHTML = task
    minuteCell.innerHTML = calculateTime(stime,etime,sdate)
    actionCell.innerHTML = '<button class="btn" onclick="OnEdit('+index+');">Edit</button><button class="btn" onclick="deleteRow('+index+');">Delete</button>'
}
 
function deleteRow(index){
    var table  = document.getElementById("list")
    table.deleteRow(index);
    Array.splice(index,1);
    localStorage.record = JSON.stringify(Array);
    init();

}
var selectedIndex = -1;
function OnClear(){
    selectedIndex = -1;
    document.querySelector('input[type="date"]').value = "";
    document.getElementById("stime").value = "";
    document.getElementById("etime").value = "";
    document.getElementById("task").value = "";
    document.getElementById("submit").innerHTML = "Add";
}
function OnEdit(index){
    selectedIndex = index;
    var obj = Array[index]
    document.querySelector('input[type="date"]').value = obj.sdate;
    document.getElementById('stime').value = obj.stime;
    document.getElementById('etime').value = obj.etime;
    document.getElementById('task').value = obj.task;
    document.getElementById("submit").innerHTML = "Update";
}
function checkDate(){
    let d;
    sdate =  document.querySelector('input[type="date"]').value;
    if(sdate === ""){
        d = false;
        alert("Date Cannot be Empty ")
    }else{
        d = true;
    }
    return d;
}

function checkTime(){
    let t;
    stime = document.getElementById("stime").value;
    etime = document.getElementById("etime").value;
    if(stime === etime){
        t = false;
        alert("start time and end time cannot be same")
    }
    else{
        t = true;
    }
    return t;
}

function checkTask(){
    let d;
    task = document.getElementById("task").value;
    if(task === ""){
        d = false;
        alert("Description box cannot be empty");
    }else if(task.length <= 5 ){
        d = false;
        alert("Please Write in Detail")
    }else{
        d = true
    }
    return d;
}
function download(){
      var xyz =  document.getElementById("img-converter");
      domtoimage.toPng(xyz)
      .then(function(dataUrl){
          var img = new Image();
          img.src = dataUrl;
          downloadURL(dataUrl,"img.png")
        })
        .catch(function(error){
            console.error("error found",error);
        })
}

function downloadURL(url, name){
    var link = document.createElement("a");
    link.download= name;
    link.href = url;
    document.body.appendChild(link);
    link.click();   
    document.body.removeChild(link);
    delete link

}    
function calculateTime(stime,etime,sdate) {
            //get values
            var valuestart = stime;
            var valuestop = etime;
            console.log(valuestart,valuestop,sdate)

              
             //create date format          
            //  var timeStart = new Date(sdate + valuestart.value).getTime();
            //  var timeEnd = new Date(sdate + valuestop.value).getTime();
            //  console.log(timeStart,timeEnd);
            // this.diff = timeEnd-timeStart;
            // this.time = this.diff/3600000;
            // this.timeMin = this.diff/60000;v 
            var diff = ( new Date("1970-1-1 " + valuestop) - new Date("1970-1-1 " + valuestart) ) / 1000 / 60 / 60;  
                 
             console.log(diff) 
            return(diff)
}
function SetDate(){
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    
    var today = year + "-" + month + "-" + day;
    document.getElementById('date').value = today;
    
}
function SetTime(){
    var now = new Date();
    var inputElementTime = document.getElementsByName("stime")[0]
    var inputElementTime1 = document.getElementsByName("etime")[0];
    inputElementTime.value = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
    inputElementTime1.value = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
}
function sum(){
    var table = document.getElementById("list");
    var sumVal = 0;

    for(var i = 1; i < table.rows.length ;i++){
        sumVal = sumVal + parseFloat(table.rows[i].cells[4].innerHTML)
    }
    total = document.getElementById("total").innerHTML = sumVal.toFixed(2)
    // var time = document.getElementById("total")
    // time.value = sumVal.toFixed(2);
}
// function time_convert(num)
//  { 
//   var hours = Math.floor(num / 60);  
//   var minutes = num % 60;
//   return hours + ":" + minutes;         
// }
