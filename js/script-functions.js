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
function setCookie(cookieName,cookieValue,expiryDate){
    if(typeof cookieName == 'string' && typeof cookieValue == 'string'){
        if(expiryDate == undefined){
            document.cookie = ""+cookieName +"="+cookieValue+";";
        } else {  
            document.cookie = ""+cookieName +"="+cookieValue+";expires="+expiryDate+";";
        }
    }else{
        console.error("cookie names and their values should be strings");
        return false;
    }
}