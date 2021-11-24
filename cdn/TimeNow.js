var t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    var y = dt.getYear() + 1900;
    var m = dt.getMonth() + 1;
    var d = dt.getDate();
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var day = dt.getDay();
    var hh = dt.getHours();
    var mm = dt.getMinutes();
    var ss = dt.getSeconds();
    if (hh < 10) hh = "0" + hh;
    if (mm < 10) mm = "0" + mm;
    if (ss < 10) ss = "0" + ss;
    document.getElementById("timeShow").innerHTML = "<span class='high'>现在是：</span> " + y + " 年 " + m + " 月 " + d + " 日 " + weekday[day] + " " + hh + "：" + mm + "：" + ss;
    t = setTimeout(time, 1000);
}