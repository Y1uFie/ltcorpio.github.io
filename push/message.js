layer.alert('这里你可以给 LTcorpio 发送匿名消息，但请发送有意义的内容，发送无意义消息打扰到 LTcorpio 休息是要被打屁股的！！！', {
    time: 10 * 1000,
    success: function(layero, index) {
        var timeNum = this.time / 1000,
            setText = function(start) {
                layer.title('使用前说明 · ' + (start ? timeNum : --timeNum) + ' 秒后自动关闭', index);
            };
        setText(!0);
        this.timer = setInterval(setText, 1000);
        if (timeNum <= 0) clearInterval(this.timer);
    },
    end: function() {
        clearInterval(this.timer);
    }
});

function timeString(time) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + " 年 " + month + " 月 " + date + " 日 " + hour + "：" + minute + "：" + second;
};

$('#submit').on('click', function() {
    var link = "https://api.day.app/";
    var device = $("#pushDevice").val();
    link = link + device + "/";
    var title = $("#Title").val();
    var content = $("#Content").val();
    if (content == "") {
        layer.msg('“推送内容”为必填项，不可置空。', {
            icon: 2
        });
        return false;
    }
    if (title == "") link = link + content;
    else link = link + title + "/" + content;
    var sound = $("#Alarm").val();
    var group = $("#Group").val();
    var url = $("#url").val();
    if ($("#Archives").prop('checked'))
        var isArchive = 1;
    if ($("#toClipboard").prop('checked'))
        var autoCopy = 1;
    $.ajax({
        type: 'post',
        url: link,
        data: {
            'sound': sound,
            'group': group,
            'url': url,
            'isArchive': isArchive,
            'autoCopy': autoCopy
        },
        success: function(data) {
            $("#statusCode").html(data.code);
            $("#status").html(data.message);
            var timestamp = data.timestamp;
            var unixTimestamp = new Date(timestamp * 1000);
            // commonTime = unixTimestamp.toLocaleString();
            $("#pushTime").html(timeString(unixTimestamp));
            layer.msg('推送成功！', {
                icon: 1
            })
        },
        error: function() {
            layer.msg('推送失败！请检查自己的推送内容是否过于复杂（尽量不要在推送内容中推送网址）并再试一次。若多次失败，请联系管理员核查是否与本站成功绑定对应的 API Key。', {
                icon: 2
            });
            var height = $('.layui-layer-content')[0].clientHeight;
            $('.layui-layer-ico').css("top", (height / 2) - 15);
        }
    })
})