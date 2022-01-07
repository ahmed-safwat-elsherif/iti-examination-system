var t
var user = $(".user");
var grade = $(".grade");
var fullGrade = $(".fullGrade");
var timeOut = $(".timeOut");
var emoji = $(".emoji");
var messagePhoto = $(".messagePhoto")
var comic = $(".comic")
var message = $(".message");
var totalGrade = eval(getCookie("totalGrade"))
var isTimeOut = (eval(getCookie("isTimeOut"))==1)? 
    "<img src='../images/timeOut.JPG' alt='time out'>":
    "";

timeOut.html(isTimeOut)
user.html(getCookie("fname"))
fullGrade.html(getCookie("fullGrade"))
grade.html(totalGrade)

var num = eval(fullGrade.html())
var result = checkGrade(totalGrade,num)

var isFailed = (result[2]=="red")? 
["<img src='../images/failed.JPG' alt='time out'>","<img src='../images/failed2.JPG' alt='time out'>"]:
["<img src='../images/congrats.jpg' alt='timeOut'>","<img src='../images/congrats3.jpg' alt='timeOut'>"];
emoji.append(result[0])
grade.css("color",result[2])
message.html(result[1])
messagePhoto.html(isFailed[0])
comic.html(isFailed[1])
if(result[2] == "red"){
    messagePhoto.css("right","0px")
    comic.css("left","0px")
} else {
    messagePhoto.css("left","0px")
    comic.css("right","0px")
}
var animate = setTimeout(function(){
    $('.card').fadeIn("slow")
},1000)
var animate2 = setTimeout(function(){
    messagePhoto.fadeIn("slow")
},2000)
var animate2 = setTimeout(function(){
    comic.slideDown("slow")
},2000)

function getCookie(cookieName){
    try{
        var allCookies = document.cookie.split("; ");
        var flag = false;
        var result = false;
        allCookies.forEach(function(cookie){
            var name = cookie.split("=");
            if(cookieName ==  name[0]){
                flag = true;
                result = name[1];
            }   
        })
        if(!flag){
            return result;
        }
        return result;
    }catch(e){
        console.error("cookie name is not defined well, it must be only string");
    }
}
function checkGrade(grade,fullGrade){

    var percent = grade * 100/fullGrade;
    
    if(percent <= 100 && percent >= 75){
        return ["<i class='far fa-grin-stars'></i>",
                "Excellent Job, Buddy!","green"];
    } else if (percent < 75 && percent >= 50 ){
        return ["<i class='far fa-grin-beam-sweat'></i>",
                '"Very good, but you neet to put some efforts!"',"orange"]
    } else {
        return ["<i class='far fa-sad-tear'></i>", 
                '"We are sorry! .. you should study harder than that"',"red"]
    }
}