let Plan = [];
// let times = ["10-8","12-10","14-12","18-16"];
let day = ["شنبه","یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه"];
function createColumns()  {
    var input = document.getElementById("number").value;
    let id = input * day.length;
    document.getElementById("shift").innerHTML = "";
    let hoursHtml = `<thead><tr><th></th>`
    for (let m = 0; m < input; m++) {
        hoursHtml += `<th>${m+1}</th>`
        
    }
    document.getElementsByTagName("table")[0].innerHTML +=hoursHtml+`</tr></thead><tbody>`;
    
    let string ="";
    for (let i = 0; i < day.length; i++) {
        string+=`<tr><td>${day[i]}</td>`;
       
    let arr = [];
        for (let j = 0; j < input; j++) {
            arr.push(id);
            string += `<td class="select"><button class="button" id=${id--} onclick=changeGender(${id + 1})>بانوان</button></td>`;
            
            
        }
        Plan.push(arr)
    }
    
    document.getElementsByTagName("table")[0].innerHTML +=string+`<tr></tbody>`;
    
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
    let ExportData = [];
    for(i = 0; i < Plan.length; i++) {
        ExportData.push([]); 
        for(j = 0; j < Plan[i].length; j++){
            let value = document.getElementById(Plan[i][j]).innerHTML;
            if(value == "آقایان") {
                 ExportData[i][j] = 0;
            } else if (value == "بانوان") {
                ExportData[i][j] = 1;
            } else {
                ExportData[i][j] = 2;
            }
            
        }
    }

    alert( JSON.stringify(ExportData) )
}
