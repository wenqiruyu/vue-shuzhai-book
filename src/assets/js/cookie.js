/* main.js中// cookie的使用  设置cookie
Vue.prototype.setCookie=function(cname, cvalue, exdays) {
    var date = new Date();
    //设置exdays天时效 
    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + date.toUTCString();
    console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
    console.info(document.cookie);
   }
  
  //  获取cookie
  Vue.prototype.getCookie= function(cname) {
  　　var name = cname + "=";
  　　var ca = document.cookie.split(";");
  　　for (var i = 0; i < ca.length; i++) {
  　　  var c = ca[i];
  　　while (c.charAt(0) == " ") c = c.substring(1);
  　　if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
   }
  
   // 清除cookie
  Vue.prototype.clearCookie= function() {
  　　this.setCookie("username", "", -1);
  }*/

/*用export把方法暴露出来*/
// cookie的使用  设置cookie
export function setCookie(cname, cvalue, exdays) {
    var date = new Date();
    //设置exdays天时效 
    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + date.toUTCString();
    console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
    console.info(document.cookie);
}
  
//  获取cookie
export function getCookie(cname) {
    　　var name = cname + "=";
    　　var ca = document.cookie.split(";");
    　　for (var i = 0; i < ca.length; i++) {
        　　var c = ca[i];
        　　while (c.charAt(0) == " ") c = c.substring(1);
        　　if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

// 清除cookie
export function clearCookie(name) {
　　setCookie(name, "", -1)
}