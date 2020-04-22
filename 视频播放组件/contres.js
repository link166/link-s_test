var video = document.getElementsByTagName('video')[0]
var contres = document.querySelector(".warp>.contres")
var inner = document.querySelectorAll(".inner");
var allscreen = document.getElementById("allscrren")
var progress = document.getElementsByClassName("progress")[0]
var timetxt = document.querySelector(".time>span")
var start = document.getElementById("start");
var tperinner = 0;

video.width = document.documentElement.clientWidth;
video.height = document.documentElement.clientHeight - contres.offsetHeight;
var wws = document.documentElement.clientWidth;

//当浏览器尺寸改变时  视频 进度条 改变
window.onresize = () => {
    if (document.documentElement.clientWidth >= 500) {
        video.width = document.documentElement.clientWidth;
        video.height = document.documentElement.clientHeight - contres.offsetHeight;
        var tpre = inner[0].getAttribute("pre")
        inner[0].style.left = tpre + "%";
        document.querySelector(".warp2").style.width = tpre + "%"
    }
}

//进度条拖动时
function drag(element) {
    element.onmousedown = (e) => {
        var ev = e;
        var target = e.target;
        var startpoint = e.clientX;
        var elementx;
        elementx = target.offsetLeft;
        document.onmousemove = (e) => {
            var pointx = e.clientX;
            var l = elementx + pointx - startpoint;
            var maxwidth = element.parentElement.clientWidth;
            if (l <= 0) {
                l = 0;
            } else if (l >= maxwidth) {
                l = maxwidth;
            }
            //通过  进度条按钮组件与进度条长度  百分比控制 方便后续操作
            var pre = l / maxwidth * 100;
            element.style.left = pre + '%';
            document.querySelector("#" + element.parentElement.parentElement.id + ">.warp2").style.width = element.offsetLeft + 'px';
            element.setAttribute("pre", pre)
            if (element.id == "time") {
                video.currentTime = pre * video.duration / 100;
            } else if (element.id == "sound") {
                video.volume = pre / 100;
            }
        }
        document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
        }
        return false;
    }
}

//进度条
drag(inner[0])
    //音量条
drag(inner[1])


//开始按钮
var vstatus = "stop"
start.onclick = () => {
    if (vstatus == "stop") {
        video.play();
        start.innerHTML = '&#xe638';
        vstatus = "play"
            //递归 控制进度条移动
        var j = setInterval(timemove, 1000);
    } else {
        video.pause()
        start.innerHTML = '&#xe61c;';
        vstatus = "stop"
        clearInterval(j);
    }
    //视频结束后操作 进度条归零
    video.onended = () => {
        inner[0].style.left = 0 + 'px';
        inner[0].setAttribute("pre", '0');
        document.querySelector("#" + inner[0].parentElement.parentElement.id + ">.warp2").style.width = '0px';
        start.innerHTML = '&#xe61c;';
        vstatus = "stop";
        clearInterval(j);
    }
}

//进度条移动    通过 播放时间与总时间 百分比 进行移动
function timemove() {
    var time = video.duration;
    var nowtime = video.currentTime;
    var tpre = nowtime / time * 100;
    inner[0].setAttribute("pre", tpre);
    inner[0].style.left = tpre + "%";
    document.querySelector(".warp2").style.width = tpre + "%";
    timetxt.innerHTML = gettime(time - nowtime);
}

//当视频 第一帧加载好后 更改视频时长
video.onloadeddata = () => {
    timetxt.innerHTML = gettime(video.duration)
}

//视频时长格式 改变
function gettime(x) {
    var s = Math.floor(x % 60) + '';
    var m = Math.floor((x / 60) % 60) + '';
    var h = Math.floor((x / 60) / 60) + '';
    s = addz(s);
    m = addz(m);
    h = addz(h);
    return "-" + h + ":" + m + ":" + s;
}

function addz(x) {
    if (x.length < 2) {
        return '0' + x;
    }
    return x;
}

//重播按钮   更改播放时长 进度条位置
var refresh = document.getElementById("refresh");
refresh.onclick = () => {
    video.currentTime = 0;
    inner[0].style.left = 0 + 'px';
    document.querySelector("#" + inner[0].parentElement.parentElement.id + ">.warp2").style.width = '0px';
}

//点击进度条  根据鼠标相对位置与总进度条长度 之比 更改播放时长 进度条位置
progress.onclick = (e) => {
    var moveto = e.clientX - progress.offsetLeft;
    var pre = moveto / progress.offsetWidth;
    inner[0].setAttribute("pre", pre);
    inner[0].style.left = pre * 100 + '%';
    document.querySelector("#" + inner[0].parentElement.parentElement.id + ">.warp2").style.width = pre * 100 + '%';
    video.currentTime = video.duration * pre;
}


//全屏
var isfullscreen = false;
allcreen.onclick = (e) => {

    if (isfullscreen) {
        isfullscreen = false;
        if (document.exitFullscreen) {
            document.exitFullscreen()
            video.width = document.documentElement.clientWidth;
            video.height = document.documentElement.clientHeight - contres.offsetHeight;
        }
    } else {
        isfullscreen = true;
        var doce = document.documentElement;
        if (doce.requestFullscreen) {
            doce.requestFullscreen();
        }
        video.width = document.documentElement.clientWidth;
        video.height = document.documentElement.clientHeight - contres.offsetHeight;
    }
}