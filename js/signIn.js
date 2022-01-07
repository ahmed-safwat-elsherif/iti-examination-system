var email = document.getElementById("email");
var password = document.getElementById("password");
var span = document.getElementsByTagName("span");
var RegEmail = /^([\w\d\+\-]+(\.[\w\d\+\-]+)*@([\w\d\-]+(\.)[\w\d\-]+)|(""(.+))""@([\w\d]+))((\.)(\w+))*$/g;

function getCookie(namee) {
    var name = namee + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(namee.length, c.length);
        }
    }
    return "";
}
var subButton = document.getElementById("submit");
subButton.addEventListener("click", check);
function check(e) {

    e.preventDefault();
    var result = true;
    var count = 0;
  
   
    for (var i = 0; i < 2; i++) {
        span[i].innerHTML = "";
        email.style.borderColor = password.style.borderColor= "#0a043c";
    }
    if (email.value == "") {
        span[count].innerHTML = "Email is required !";
        result = false;
        email.style.borderColor = "red";
    }
    else if (email.value.match(RegEmail) == null) {
        span[count].innerHTML = "Email as xx@xxx.xxx!";
        result = false;
        email.style.borderColor = "red";
    }
    else if (getCookie("email").split("=")[1] != email.value) {
        alert("Email is not valid!");
        result = false;
        email.style.borderColor = "red";
    }

    count++;
    if (password.value == "") {
        span[count].innerHTML = "Password is required !";
        result = false;
        password.style.borderColor = "red";
    }
    else if (password.value.length <= 7) {
        span[count].innerHTML = "Password should be more than or equal 8 characters !";
        result = false;
        password.style.borderColor = "red";

    }
    else if (getCookie("password").split("=")[1] != password.value) {
        alert("password is not valid!");
        result = false;
        password.style.borderColor = "red";
    }
    
    if (result) {
        window.location.replace("start.html");
    }
    return result;
}