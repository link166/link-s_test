var canvas = document.getElementById("mycanvas")

var ctx = canvas.getContext("2d");

const deg = Math.PI / 180

let warpW = canvas.width;
let warpH = canvas.height;
ctx.translate(warpW / 2, warpH / 2)

ctx.fillStyle = "rgb(135,206,235)";
ctx.strokeStyle = "rgb(135,206,235)";
ctx.shadowColor = "rgb(135,206,235)";
ctx.shadowBlur = 10;
ctx.lineCap = "round"


function drawclock() {
    let t = gettime()
    ctx.save()
    ctx.fillStyle = 'rgba(35, 0, 87,0.3)';
    ctx.clearRect(-warpW / 2, -warpH / 2, warpW, warpH)
    ctx.restore()
    drawpoint("h", t);
    drawpoint("m", t)
    drawpoint("s", t)
    drawtxt(t);
}

drawclock()
setInterval(drawclock, 16)

function drawpoint(type, t) {
    let r = 0;
    let begindeg = -90 * deg;
    let enddeg;
    if (type == "h") {
        r = 230
        enddeg = t.h >= 60 ? 0 : t.h % 12 * 30 * deg + t.m * 0.5 * deg
    } else
    if (type == "m") {
        r = 190
        enddeg = t.m >= 60 ? 0 : t.m * 6 * deg + t.s * 0.1 * deg
    } else {
        r = 150
        enddeg = t.s >= 60 ? 0 : (t.s * 6 * deg + t.millsc * (6 / 1000) * deg)
    }
    ctx.save();
    ctx.lineWidth = "20";
    ctx.beginPath()
    ctx.arc(0, 0, r, begindeg, begindeg + enddeg)
    ctx.stroke();
    ctx.restore();
}

function drawtxt(t) {

    let str = t.year + "年 " + t.mouth + "月 " + t.day + "日";
    let h = "0" + t.h;
    let m = "0" + t.m;
    let s = "0" + t.s
    let mls = "00" + t.millsc
    let str2 = h.slice(-2) + " ：" + m.slice(-2) + " ：" + s.slice(-2) /* + " ：" + mls.slice(-3)*/ ;
    ctx.save();
    ctx.font = "16px adf"
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom"
    ctx.beginPath()
    ctx.strokeText(str, 0, 0)
    ctx.strokeText(str2, 0, 20)
    ctx.restore();
}


function gettime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let day = date.getDay();
    let year = date.getFullYear();
    let mouth = date.getMonth() + 1;
    let millsc = date.getMilliseconds();
    return { year, mouth, day, h, m, s, millsc }
}