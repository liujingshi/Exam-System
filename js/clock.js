
var clock = function(second = 0) {
    var h = 0;
    var m = 0;
    var s = 0;
    h = Math.floor(second / 3600);
    second %= 3600;
    m = Math.floor(second / 60);
    second %= 60;
    s = second;
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
