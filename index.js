let Plan = [];
let day = ["شنبه","یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه"];

function createColumns()  {
    var shiftNumber = document.getElementById("number").value;
    if(isNaN(shiftNumber) || +shiftNumber<=0){
        alert("لطفا تعداد شیفت را وارد کنید")
        return;
    }
    let id = shiftNumber * day.length;
    document.getElementById("shift").innerHTML = "";
    let hoursHtml = `<thead><tr><th></th>`
    for (let m = 0; m < shiftNumber; m++) {
        hoursHtml += `<th>${m+1}</th>`
        
    }
    document.getElementsByTagName("table")[0].innerHTML +=hoursHtml+`</tr></thead>`;
    
    let tablebody ="<tbody>";
    for (let i = 0; i < day.length; i++) {
        tablebody+=`<tr><td>${day[i]}</td>`;
       
    let arr = [];
        for (let j = 0; j < shiftNumber; j++) {
            arr.push(id);
            tablebody += `<td class="select"><button class="button" id=${id--} onclick=changeGender(${id + 1})>بانوان</button></td>`;
            
        }
        Plan.push(arr)
    }
    
    document.getElementsByTagName("table")[0].innerHTML +=tablebody+`<tr></tbody>`;
}


function changeGender(id){
    let gender = document.getElementById(id).innerHTML;
 
    if(gender == "آقایان")
        document.getElementById(id).innerHTML = "بانوان";
    else if(gender == "بانوان")
        document.getElementById(id).innerHTML = "تعطیل";
    else
        document.getElementById(id).innerHTML = "آقایان";
    
}

function GetData(){
    let ExportData = "";
    for(i = 0; i < Plan.length; i++) {
        for(j = 0; j < Plan[i].length; j++){
            let value = document.getElementById(Plan[i][j]).innerHTML;
            if(value == "آقایان") {
                 ExportData += "1";
            } else if (value == "بانوان") {
                ExportData += "2";
            } else {
                ExportData += "3";
            }
            
        }
    }
    document.getElementById("output").value= ExportData.toString();
   return ExportData.toString();
}

function SetData(data){
    let dataWithOutComma = data.split(",").join("");
    let options = {
        1:"آقایان",
        2:"بانوان",
        3:"تعطیل"
    }
    let columnCount = dataWithOutComma.length / 7;
    let columnArray = [];
    for (let i = 0; i < 7; i++) {
        let colDay = dataWithOutComma.slice(0,columnCount);
        dataWithOutComma = dataWithOutComma.slice(columnCount);
        let colDayArray = Array.from(colDay);
        columnArray.push(colDayArray);
    }

    let shiftNumber = columnArray[0].length;
    let id = shiftNumber * columnArray.length;
    document.getElementById("shift").innerHTML = "";
    let hoursHtml = `<thead><tr><th></th>`
    for (let m = 0; m < shiftNumber; m++) {
        hoursHtml += `<th>${m+1}</th>`
        
    }
    document.getElementsByTagName("table")[0].innerHTML +=hoursHtml+`</tr></thead><tbody>`;
    
    let string ="";
    for (let i = 0; i < columnArray.length; i++) {
        string+=`<tr><td>${day[i]}</td>`;
       
    let arr = [];
        for (let j = 0; j < shiftNumber; j++) {
            arr.push(id);
            string += `<td class="select"><button class="button" id=${id--} onclick=changeGender(${id + 1})>${options[columnArray[i][j]]}</button></td>`;
            
            
        }
        Plan.push(arr)
    }
    
    document.getElementsByTagName("table")[0].innerHTML +=string+`<tr></tbody>`;
    document.getElementById("output").value= JSON.stringify(GetData());
}



function SetDataUser(data,cap,sell){
    let parsedSell = JSON.parse(sell);
    
    let dataWithOutComma = data.split(",").join("");
    let capNOComma = cap.split(",");
    let options = {
        1:"آقایان",
        2:"بانوان",
        3:"تعطیل"
    }
    let columnNUmber = dataWithOutComma.length / 7;
    let columnArray = [];
    let capArray = [];
    for (let i = 0; i < 7; i++) {
        let colDay = dataWithOutComma.slice(0,columnNUmber);
        dataWithOutComma = dataWithOutComma.slice(columnNUmber);
        let colDayArray = Array.from(colDay);
        columnArray.push(colDayArray);
        let rowCap = capNOComma.slice(0,columnNUmber);
        capNOComma = capNOComma.slice(columnNUmber)
        let rowCapArray = Array.from(rowCap);
        capArray.push(rowCapArray);
    }
    
    let shiftNumber = columnArray[0].length;
    let realId=0;
    for (let se of parsedSell) {
        let id = se['shiftID'];
        let forosh = se['SUM(count)'];
        capArray[Math.trunc(id/shiftNumber)][id - (Math.trunc(id/shiftNumber)*shiftNumber)] -= forosh;
    }
    document.getElementById("shift").innerHTML = "";
    let hoursHtml = `<thead><tr><th></th>`
    for (let m = 0; m < shiftNumber; m++) {
        hoursHtml += `<th>${m+1}</th>`
        
    }
    document.getElementsByTagName("table")[0].innerHTML +=hoursHtml+`</tr></thead><tbody>`;
    
    let string ="";
    for (let i = 0; i < columnArray.length; i++) {
        string+=`<tr><td>${day[i]}</td>`;
       
    let arr = [];
        for (let j = 0; j < shiftNumber; j++) {
            arr.push(realId);
            string += `<td class="select"><button onClick="selectShift(${realId})" class="button" id=${realId++} >`;
            if(options[columnArray[i][j]]!="تعطیل")
                string +=  `نوع : ${options[columnArray[i][j]]}&nbsp ظرفیت : ${capArray[i][j]}</button></td>`;
            else
                string +=  `${options[columnArray[i][j]]}</button></td>`;
        }
        Plan.push(arr)
    }
    
    document.getElementsByTagName("table")[0].innerHTML +=string+`<tr></tbody>`;
}

function selectShift(shiftID){
    let value = document.getElementById(shiftID).innerHTML;
    if(value == "تعطیل"){
        document.getElementById('shiftID').value = null;
        return alert("شیفت انتخاب شده تعطیل می‌باشد");
    }
        
    document.getElementById('shiftID').value = shiftID;
    let gender = null;
    if(value.includes('بانوان'))
        gender=1;
    if(value.includes('آقایان'))
        gender=2;

    document.getElementById('gender').value = gender;

}

function validateForm(){
    let count = document.forms["buyForm"]["input"].value;
    let shiftID = document.forms["buyForm"]["shiftID"].value;
  if (isNaN(count) || +count<=0) {
    alert("تعداد وارد شده نامعتبر است");
    return false;
  }

if (shiftID == "" || +shiftID<0) {
    alert("شیفت انتخاب شده معتبر نیست");
    return false;
  }
    
}