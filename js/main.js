
$("#exam-result, .reset").hide();

var item1 = [];
var item2 = [];
var danxuanNumber = 60;
var duoxuanNumber = 40;
var layer = null;
var form = null;

layui.use(['layer', 'form'], function () {
    layer = layui.layer;
    form = layui.form;
    form.on('submit(ok)', function (data) {
        layer.confirm('确认要交卷吗?', function (index) {
            data = data.field;
            for (var i = 0; i < duoxuanNumber; i++) {
                item2[i]['user'] = "";
                $("input:checkbox[name='duoxuan" + i + "']:checked").each(function () {
                    if ($(this).val() != undefined) {
                        item2[i]['user'] += $(this).val();
                    }
                });
            }
            for (var i = 0; i < danxuanNumber; i++) {
                item1[i]['user'] = "";
                if (data['danxuan' + i] != undefined) {
                    item1[i]['user'] = data['danxuan' + i];
                }
            }
            showResult();
            layer.close(index);
        });
        return false;
    });
    $(".reset").bind("click", function() {
        layer.confirm('确认要重新开始吗?', function (index) {
            document.location.reload();
            layer.close(index);
        });
    }); 
});

var rand = function (n) {
    return Math.floor(Math.random() * n);
}

var getRand = function (n, max) {
    var tempItem = []
    while (tempItem.length < n) {
        var tem = rand(max);
        if (tempItem.indexOf(tem) < 0) {
            tempItem.push(tem);
        }
    }
    return tempItem;
}

var getItem = function () {
    item1 = [];
    item2 = [];
    var tempItem = getRand(danxuanNumber, danxuan.length - 1);
    for (var i in tempItem) {
        item1.push(danxuan[tempItem[i]]);
    }
    tempItem = getRand(duoxuanNumber, duoxuan.length - 1);
    for (var i in tempItem) {
        item2.push(duoxuan[tempItem[i]]);
    }
}

var show = function () {
    new Vue({
        el: '#vue-div',
        data: {
            item1: item1,
            item2: item2
        }
    });
}

getItem();
show();

var showResult = function () {
    var score1 = 0;
    var score2 = 0;
    for (var i = 0; i < danxuanNumber; i++) {
        if (item1[i].user == item1[i].ANS) {
            score1++;
            item1[i]['state'] = 1;
        } else {
            item1[i]['state'] = 0;
        }
    }
    for (var i = 0; i < duoxuanNumber; i++) {
        if (item2[i].user == item2[i].ANS) {
            score2++;
            item2[i]['state'] = 1;
        } else {
            item2[i]['state'] = 0;
        }
    }
    var score = score1 + score2;
    $(".submit, .clock").hide();
    $(".reset").show();
    var i = 0;
    $(".layui-row").eq(0).find(".layui-card").each(function () {
        var $title = $(this).find(".green").eq(0);
        if (item1[i].state == 0) {
            $title.removeClass("green");
            $title.addClass("red");
            $title.html($title.html() + "、错误、正确答案:" + item1[i].ANS);
        } else {
            $title.html($title.html() + "、正确");
        }
        i++;
    });
    i = 0;
    $(".layui-row").eq(1).find(".layui-card").each(function () {
        var $title = $(this).find(".green").eq(0);
        if (item2[i].state == 0) {
            $title.removeClass("green");
            $title.addClass("red");
            $title.html($title.html() + "、错误、正确答案:" + item2[i].ANS);
        } else {
            $title.html($title.html() + "、正确");
        }
        i++;
    });
    layer.alert("总分:" + score + "<br>单选:" + score1 + "<br>多选:" + score2, {
        title: "成绩",
        icon: 6
    });
}


