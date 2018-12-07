
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
                    item2[i]['user'] += $(this).val();
                });
            }
            for (var i = 0; i < danxuanNumber; i++) {
                item1[i]['user'] = "";
                item1[i]['user'] = data['danxuan' + i];
            }
            layer.close(index);
        });
        return false;
    });
    form.on('submit(reset)', function (data) {
        layer.confirm('确认要重新开始吗?', function (index) {
            document.location.reload;
            layer.close(index);
        });
        return false;
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

$(".submit").bind("click", function () {
    $("#exam").submit();
});

var showResult = function () {
    var score1 = 0;
    var score2 = 0;
    for (var i = 0; i < danxuanNumber; i++) {
        if (item1[i].user == item1[i].ANS) {
            score1++;
        }
    }
    for (var i = 0; i < duoxuanNumber; i++) {
        if (item2[i].user == item2[i].ANS) {
            score2++;
        }
    }
    var score = score1 + score2;
    $("#exam, .submit, .clock").hide();
    new Vue({
        el: '#vue-div1',
        data: {
            item1: item1,
            item2: item2
        }
    });
    $("#exam, .reset").show();
    layer.alert("总分:<br>单选:<br>多选:", {
        title: "成绩",
        icon: 6
    });
}
