var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var clearscreen = document.getElementById("clearscreen")
var color = document.getElementById("c")
var r = document.getElementById("r")
var cleararea = document.getElementById("cleararea")
var w = document.getElementById("w")
ctx.lineCap = "round"

var dataarr = [];
canvas.onmousedown = (e) => {
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (dataarr.length < 1000) { dataarr.push(img); }
    var startx = e.clientX - canvas.offsetLeft;
    var starty = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    document.onmousemove = (e) => {
        var endx = e.clientX - canvas.offsetLeft;
        var endy = e.clientY - canvas.offsetTop;
        ctx.save();
        ctx.lineTo(endx, endy)
        ctx.moveTo(endx, endy)
            // ctx.moveTo(endx, endy)

        ctx.stroke();
        ctx.restore();
    }
    document.onmouseup = (e) => {
        document.onmouseup = null;
        document.onmousemove = null;
    }
    return false;
}

clearscreen.onclick = (e) => {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

color.onchange = (e) => {
    ctx.strokeStyle = color.value;
}

r.onclick = (e) => {
    if (dataarr.length > 0) {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        var img = dataarr.pop();
        ctx.putImageData(img, 0, 0);
    }
}

var flag = false;

cleararea.addEventListener('click', (e) => {
    if (!flag) {
        cleararea.className += " checked"
        flag = true;
        canvas.addEventListener('mousedown', cleara)
    } else {
        flag = false;
        cleararea.className = ""
        canvas.removeEventListener('mousedown', cleara)
    }
})

w.onchange = (e) => {
    ctx.lineWidth = w.value;
}

function cleara(e) {
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    dataarr.push(img);
    var startx = e.clientX - canvas.offsetLeft;
    var starty = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    document.onmousemove = (e) => {
        var endx = e.clientX - canvas.offsetLeft;
        var endy = e.clientY - canvas.offsetTop;
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineTo(endx, endy)
        ctx.moveTo(endx, endy)
            // ctx.moveTo(endx, endy)

        ctx.stroke();
        ctx.restore();
    }
    document.onmouseup = (e) => {
        document.onmouseup = null;
        document.onmousemove = null;
    }
    return false;
}