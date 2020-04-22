// 1 把人物抽象成对象(

var warp = $('.warp')
var arr = [];
var i = 1000;

function Snowman(runtime) {
    this.runtime = runtime;
    i--;
    Snowman.prototype.create = function() {
        var inner = $('<div class="snowman"></div>')
        inner.css({
            'animation': 'run ' + (runtime / 7) + 's steps(4) both infinite, move ' + runtime + 's linear ',
            'z-index': i
        })
        warp.append(inner)
    }
}

// 随机速度
function createspeed() {
    var num = Math.floor(Math.random() * 10) + 7;
    return num;
}


//移动
function j() {
    return new Promise((resolve, reject) => {
        setInterval(function() {
            let time = createspeed();
            let snowman = new Snowman(time)
            arr.push(snowman)
            snowman.create();

            resolve(time)
        }, 3000)
    })
}

function j2(time) {
    setTimeout(() => {
        console.log(arr + ' ' + time)
        let sb = arr.shift();
        delete sb;
        warp.children().eq(0).remove();
    }, time)
}

new Promise((resolve, reject) => { resolve() }).then(j).then(j2).catch((err) => {
    if (err) console.log(err)
})