var fname = document.getElementById("fname");
var sname = document.getElementById("sname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var cfpassword = document.getElementById("cfpassword");
var address = document.getElementById("address");
var span = document.getElementsByTagName("span");
var RegEmail = /^([\w\d\+\-]+(\.[\w\d\+\-]+)*@([\w\d\-]+(\.)[\w\d\-]+)|(""(.+))""@([\w\d]+))((\.)(\w+))*$/g;

var subButton = document.getElementById("submit");
subButton.addEventListener("click", check);
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}
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
function check(e) {
    e.preventDefault();
    var result = true;
    var count = 0;
    console.log(span.length)
    for (var i = 0; i < span.length; i++) {
        span[i].innerHTML = "";
        fname.style.borderColor = sname.style.borderColor = email.style.borderColor =
            address.style.borderColor = password.style.borderColor = cfpassword.style.borderColor = "#0a043c";
    }
    if (fname.value == "") {
        span[count].innerHTML = "First Name is required !";
        fname.style.borderColor = "red";
        result = false;
    }
    setCookie("fname", fname.value);
    count++;
    if (!isNaN(fname.value) && fname.value.length > 0) {
        span[count].innerHTML = "First Name should only character !";
        result = false;
        fname.style.borderColor = "red";

    }
    setCookie("fname", fname.value);
    count++;
    if (sname.value == "") {
        span[count].innerHTML = "Last Name is required !";
        result = false;
        sname.style.borderColor = "red";

    }
    setCookie("sname", sname.value);
    count++;

    if (!isNaN(sname.value) && sname.value.length > 0) {
        span[count].innerHTML = "Last Name should only character !";
        result = false;
        sname.style.borderColor = "red";

    }
    setCookie("sname", sname.value);
    count += 1;
    if (email.value == "") {

        span[count].innerHTML = "E-Mail is required !";
        result = false;
        email.style.borderColor = "red";

    }
    count += 1;
    if (email.value.match(RegEmail) === null && email.value != "") {

        span[count].innerHTML = "Email is not valid please enter email as xx@xx.xxx !";
        result = false;
        email.style.borderColor = "red";

    }
    setCookie("email", email.value);
    count += 1;
    if (address.value == "") {
        span[count].innerHTML = "Address is required !";
        result = false;
        address.style.borderColor = "red";

    }
    setCookie("address", address.value);
    count += 1;
    if (password.value == "") {
        span[count].innerHTML = "Password is required !";
        result = false;
        password.style.borderColor = "red";
    }
    setCookie("password", password.value);
    count++;
    if (password.value.length <= 7 && password.value.length > 0) {
        span[count].innerHTML = "Password should be more than or equal 8 characters !";
        result = false;
        password.style.borderColor = "red";

    }
    setCookie("password", password.value);
    count++;
    if (cfpassword.value == "") {
        span[count].innerHTML = " Confirm Password is required !";
        result = false;
        cfpassword.style.borderColor = "red";
    }

    setCookie("cfpassword", cfpassword.value);
    count++;
    if (cfpassword.value.length <= 7 && cfpassword.value.length > 0) {
        span[count].innerHTML = " Confirm Password should be more than or equal 8 characters !";
        result = false;
        cfpassword.style.borderColor = "red";
    }

    setCookie("cfpassword", cfpassword.value);
    count++;

    if (getCookie("password") != getCookie("cfpassword")) {
        alert("please enter valid password equal confirm password");
        password.value = "";
        cfpassword.value = "";
        password.style.borderColor = "red";
        cfpassword.style.borderColor = "red";
        for (var i = 0; i < span.length; i++) {
            span[i].innerHTML = "";
        }

    }


    else {


        if (result) {
            location.replace("pages/login.html");/*?fname="+fname.value+
                                             "&sname="+sname.value+
                                            "&email="+email.value+
                                            "&address="+address.value+
                                            "&password="+password.value+
                                            "&cfpassword="+ cfpassword.value
                                            );*/
        }
    }


    return result;
}