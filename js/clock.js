
var clock = function(second = 0) {
    var ss = second;
    var h = 0;
    var m = 0;
    var s = 0;
    h = Math.floor(ss / 3600);
    ss %= 3600;
    m = Math.floor(ss / 60);
    ss %= 60;
    s = ss;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    var text = h + ":" + m + ":" + s;
    $(".clock").html(text);
    setTimeout(function() {
        clock(second + 1)
    }, 1000);
}

clock();
