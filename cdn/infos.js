l("1", "2", "a", "Java Web 应用开发", "东校区 （教室待更新）", "周亚峰");
l("1", "3", "b", "*图像处理技术", "东校区 （教室待更新）", "但雨芳");

l("2", "1", "c", "深度学习基础", "东校区 （教室待更新）", "潘婕");
l("2", "2", "d", "智能电子产品制作", "东校区 （教室待更新）", "翁芸");
l("2", "3", "e", "*大数据分析", "东校区 （教室待更新）", "赵宝奇");

l("3", "1", "a", "Java Web 应用开发", "东校区 （教室待更新）", "周亚峰");
l("3", "3", "b", "*图像处理技术", "东校区 （教室待更新）", "但雨芳");

l("4", "1", "f", "机器人控制技术", "东校区 （教室待更新）", "胡国伟");
l("4", "2", "e", "*大数据分析", "东校区 （教室待更新）", "赵宝奇");

l("5", "2", "g", "“1+X”证书考证辅导", "东校区 （教室待更新）", "~");
l("5", "3", "c", "深度学习基础", "东校区 （教室待更新）", "潘婕");

function l(c, t, n, clsname, intext, tech) {
    var id = "info" + c + t,
        clsid = "info " + n;
    var elm = document.getElementById(id);
    if (t == "1") {
        var time = "08:30—09:55";
    } else if (t == "2") {
        var time = "10:05—11:30";
    } else if (t == "3") {
        var time = "13:30—14:55";
    } else if (t == "4") {
        var time = "15:05—16:35";
    } else if (t == "5") {
        var time = "18:20—19:45";
    } else {
        var time = "~";
    };
    elm.innerHTML = "<div class='maininfo'>" + clsname + '</div>' +
        "<div class='intext'><span class='int-ttl'>【时间】</span>" + time + "</div>" +
        "<div class='intext'><span class='int-ttl'>【地点】</span>" + intext + "</div>" +
        "<div class='intext'><span class='int-ttl'>【教师】</span>" + tech + "</div>";
    elm.className = clsid;
    elm.style.color = "#fff";
    elm.style.display = "block"
};
