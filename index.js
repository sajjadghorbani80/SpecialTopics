let times = ["10-8","12-10","14-12","18-16"]
let day = ["شنبه","یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه"]
let id = times.length * day.length;

let hoursHtml = `<thead><tr><th></th>`
for (let m = 0; m < times.length; m++) {
    hoursHtml += `<th>${times[m]}</th>`
    
}
document.getElementsByTagName("table")[0].innerHTML +=hoursHtml+`</tr></thead><tbody>`;


let string ="";
for (let i = 0; i < day.length; i++) {
    string+=`<tr><td>${day[i]}</td>`
   

    for (let j = 0; j < times.length; j++) {
        string += `<td class="select"><button class="button" id=${id--} onclick=changeGender(${id + 1})>آقایان</button></td>`
        
    }
}

document.getElementsByTagName("table")[0].innerHTML +=string+`<tr></tbody>`;


function changeGender(id){
    let gender = document.getElementById(id).innerHTML;
 
    if(gender == "آقایان")
        document.getElementById(id).innerHTML = "بانوان";
    else if(gender == "بانوان")
        document.getElementById(id).innerHTML = "تعطیل";
    else
        document.getElementById(id).innerHTML = "آقایان";
    
}