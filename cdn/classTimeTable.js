    function ClassTimeTable() {
        this.Week2Cn = {
            1: "周一",
            2: "周二",
            3: "周三",
            4: "周四",
            5: "周五",
            6: "周六",
            7: "周日"
        };

        this.ColorList = [
            'bg-color-1',
            'bg-color-2',
            'bg-color-3',
            'bg-color-4',
            'bg-color-5',
            'bg-color-6',
            'bg-color-7',
            'bg-color-8',
            'bg-color-9',
            'bg-color-10',
        ];
    }

    ClassTimeTable.prototype = {
        Config: {
            max_day: 5,
            session: 10,
            selector: "#class-time-table",
            data: this.Data,
            colorList: this.ColorList
        },

        setConfig: function(config = {}) {
            for (let item in this.Config) {
                if (config[item]) {
                    this.Config[item] = config[item];
                }
            }
        },

        creatBase: function() {
            var ct_header = document.querySelector(this.Config.selector + " > .ct-header"),
                ct_body = document.querySelector(this.Config.selector + " > .ct-body"),
                week_group_date = this.getDates(),
                html = '';

            for (let day = 0; day <= this.Config['max_day']; day++) {
                if (day === 0) {
                    html = '<div class="ct-th" style="min-width: 26px; margin-right: 2px"></div>';
                } else {
                    var active = "";
                    if (day === new Date().getDay())
                        active = " active";
                    html = '<div class="ct-th ' + active + '">\n' +
                        '<span class="title">' + this.Week2Cn[day] + '</span>\n' +
                        '<span class="day">' + week_group_date[day] + '</span>\n' +
                        '</div>';
                }
                ct_header.innerHTML += html;

                html = '<div class="ct-cr">';
                for (let session = 0; session < this.Config['session']; session++) {
                    if (day === 0) {
                        html += '<div class="ct-td">' + (session + 1) + '</div>';
                    }
                }
                html += '</div>';
                ct_body.innerHTML += html;
            }
        },

        updateColCss: function() {
            let one = document.querySelector(this.Config['selector'] + " > div.ct-body > div:nth-child(1) > div:nth-child(1)").offsetHeight;
            var css = '.ct-body .ct-cr .ct-td.col-1 {height: ' + (one - 10) + 'px}' +
                '.ct-body .ct-cr .ct-td.col-2 {height: ' + (one * 2 - 10) + 'px}' +
                '.ct-body .ct-cr .ct-td.col-3 {height: ' + (one * 3 - 10) + 'px}' +
                '.ct-body .ct-cr .ct-td.col-4 {height: ' + (one * 4 - 10) + 'px}' +
                '.ct-body .ct-cr .ct-td.col-5 {height: ' + (one * 5 - 10) + 'px}' +
                '.ct-body .ct-cr .ct-td.col-6 {height: ' + (one * 6 - 10) + 'px}' +
                '.ct-body .ct-cr .ct-td.col-7 {height: ' + (one * 7 - 10) + 'px}' +
                '.ct-body .ct-cr .ct-td.col-8 {height: ' + (one * 8 - 10) + 'px}' +
                '.ct-body .ct-cr .ct-td.col-9 {height: ' + (one * 9 - 10) + 'px}' +
                '.ct-body .ct-cr .ct-td.col-10 {height: ' + (one * 10 - 10) + 'px}';

            var head = document.head || document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        },

        fillInfo: function() {
            var color_arr = {},
                color_list = this.Config['colorList'] ? this.Config['colorList'] : this.ColorList,
                next, kong;
            for (let day in this.Config['data']) {
                next = 1;
                for (let item in this.Config['data'][day]) {
                    html = '';
                    let day_item = this.Config['data'][day][item];
                    item = parseInt(item);

                    if (!color_arr[day_item['name']]) {
                        color_arr[day_item['name']] = color_list[0];
                        color_list.splice(0, 1);
                    }

                    if (item > next) {
                        kong = item - next;
                        html = '<div class="ct-td kongbai col-' + kong + '"></div>';
                    }

                    var uuid = function(n) {
                        var str = "abcdefghijklmnopqrstuvwxyz-_";
                        var result = "";
                        for (var i = 0; i < n; i++) {
                            result += str[parseInt(Math.random() * str.length)];
                        }
                        return result;
                    }(12);

                    html += '<div data-index="' + day + ',' + item + '" class="ct-td col-' + day_item['length'] + ' ' + color_arr[day_item['name']] + '">' +
                        '<div class="name">' + day_item['name'] + '</div>' +
                        '<div class="limitTime">' + day_item['limitTime'] + '</div>' +
                        '<div class="teacher">' + day_item['teacher_name'] + '</div>' +
                        '<div class="address">' + day_item['class']['type'] + ' ' + day_item['class']['num'] + '</div>';

                    document.querySelectorAll(this.Config['selector'] + " > .ct-body .ct-cr")[day].innerHTML += html;

                    next = item + day_item['length'];
                }
            }
        },

        getDates: function() {
            var currentDate = new Date();
            var timesStamp = currentDate.getTime();
            var currenDay = currentDate.getDay();
            var dates = {},
                _Date, date;

            for (var i = 0; i < 7; i++) {
                _Date = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7));

                month = _Date.getMonth() + 1;
                date = _Date.getDate();

                if (month < 10) {
                    month = "0" + month;
                }
                if (date < 10) {
                    date = "0" + date;
                }

                dates[i + 1] = month + "-" + date;
            }
            return dates
        },

        clickListener: function(callback) {
            var _ConfigData = this.Config['data'];

            document.querySelectorAll('div[data-index*=","]').forEach(function(ele, num) {
                ele.addEventListener("click", function() {
                    var _arr = this.getAttribute("data-index").split(",");
                    return callback(_ConfigData[_arr[0]][_arr[1]]);
                });
            });
        }
    };

    var classs = new ClassTimeTable();
    classs.setConfig({
        max_day: 5,
        session: 10,
        selector: "#class-table",
        data: {
            1: {
                1: {
                    name: "微信公众平台开发",
                    teacher_name: "周军强",
                    class: {
                        type: "东校区",
                            num: '东 3#418'
                    },
                    length: 2,
                    limitTime: '8:30—9:55'
                },
                3: {
                    name: "Java 程序设计",
                    teacher_name: '陈磊',
                    class: {
                        type: "东校区",
                            num: '东 3#418'
                    },
                    length: 2,
                    limitTime: '10:05—11:30'
                },
                5: {
                    name: "机器学习",
                    teacher_name: "陶剑文",
                    class: {
                        type: "东校区",
                            num: '东 3#426'
                    },
                    length: 2,
                    limitTime: '13:30—14:55'
                }
            },
            2: {
                1: {
                    name: "数据采集与处理",
                    teacher_name: "但雨芳",
                    class: {
                        type: "东校区",
                            num: '东 3#426'
                    },
                    length: 2,
                    limitTime: '8:30—9:55'
                },
                3: {
                    name: "大数据基础",
                    teacher_name: "何颂颂",
                    class: {
                        type: "东校区",
                            num: '东 3#426'
                    },
                    length: 2,
                    limitTime: '10:05—11:30'
                },
                5: {
                    name: "计算机网络基础",
                    teacher_name: "竺士蒙",
                    class: {
                        type: "东校区",
                            num: '东 3#411'
                    },
                    length: 2,
                    limitTime: '13:30—14:55'
                },
            },
            3: {
                5: {
                    name: "数据可视化",
                    teacher_name: "何颂颂",
                    class: {
                        type: "东校区",
                            num: '东 3#426'
                    },
                    length: 2,
                    limitTime: '13:30—14:55'
                }
            },
            4: {
                3: {
                    name: "Java 程序设计",
                    teacher_name: '陈磊',
                    class: {
                        type: "东校区",
                            num: '东 3#418'
                    },
                    length: 2,
                    limitTime: '10:05—11:30'
                },
                5: {
                    name: "【活动】大数据工作坊活动",
                    teacher_name: '何颂颂／赵宝奇',
                    class: {
                        type: "东校区",
                            num: '东 3#122'
                    },
                    length: 4,
                    limitTime: '13:30—17:00'
                },
                9: {
                    name: "机器学习",
                    teacher_name: "陶剑文",
                    class: {
                        type: "东校区",
                            num: '东 3#426'
                    },
                    length: 2,
                    limitTime: '18:20—19:45'
                }
            },
            5: {
                1: {
                    name: "数据采集与处理",
                    teacher_name: "但雨芳",
                    class: {
                        type: "东校区",
                            num: '东 3#426'
                    },
                    length: 2,
                    limitTime: '8:30—9:55'
                },
                3: {
                    name: "大数据基础",
                    teacher_name: "何颂颂",
                    class: {
                        type: "东校区",
                            num: '东 3#426'
                    },
                    length: 2,
                    limitTime: '10:05—11:30'
                }
            }
        }
    });
    classs.creatBase();
    classs.updateColCss();
    classs.fillInfo();
    classs.clickListener(function(e) {
        console.log(e);
    });