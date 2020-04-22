// function Imgobj(x,y){
//     this
// }
var imgarea = $('.imgarea')
var imgareaW = parseInt(imgarea.width());
var imgareaH = parseInt(imgarea.height());
var imgcell;
var cellW = imgareaW / 3;
var cellH = imgareaH / 3;
var flag = true;
var arrorigin = [];
var arrradom = [];

init()

function init() {
    imgsplit();
    gamestate();
}

function imgsplit() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            arrorigin.push(i * 3 + j)
            let cell = $('<div class="imgcell"></div>')
            cell.css({
                'width': cellW + 'px',
                'height': cellH + 'px',
                'top': (i * cellH) + 'px',
                'left': (j * cellW) + 'px',
                'background-position': (-j * cellW) + 'px ' + (-i * cellH) + 'px'
            })
            cell.attr('index', i * 3 + j)
            imgarea.append(cell);
        }
    }
    imgcell = $('.imgcell');
}

function gamestate() {
    $('.start').on('click', function() {
        if (flag) {
            $('.start').text('复原')
            radomarr();
            cellorder(arrradom);
            imgcell.on('mousedown', function(e) {
                var index1 = $(this).index();
                var left = e.pageX - imgcell.eq(index1).offset().left
                var top = e.pageY - imgcell.eq(index1).offset().top
                $(document).on('mousemove', function(ev) {
                    imgcell.eq(index1).css({
                        'z-index': '10',
                        'left': ev.pageX - left - imgarea.offset().left + 'px',
                        'top': ev.pageY - top - imgarea.offset().top + 'px'
                    })
                }).on('mouseup', function(eve) {
                    var left = eve.pageX - imgarea.offset().left
                    var top = eve.pageY - imgarea.offset().top
                    var index2 = changeindex(left, top, index1)
                    console.log(index1 + ' ' + index2)
                    if (index1 == index2) {
                        cellreturn(index2)
                    } else {
                        cellcheng(index1, index2)
                    }
                    $(document).off('mousemove').off('mouseup')
                })
            })
            flag = false;
        } else {
            $('.start').text('开始')
            flag = true;
            imgcell.off('mousedown')
            arrradom = arrorigin;
            cellorder(arrradom);
        }
    })
}

function radomarr() {
    arrradom = [];
    var len = arrorigin.length;
    for (let i = 0; i < len; i++) {
        order = Math.floor(Math.random() * len);
        if (arrradom.length > 0) {
            while (arrradom.indexOf(order) > -1) {
                order = Math.floor(Math.random() * len);
            }
        }
        arrradom.push(order);

    }
    console.log(arrradom)
}

function cellorder(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        imgcell.eq(i).animate({
            'left': Math.floor(arr[i] / 3) * cellW + 'px',
            'top': arr[i] % 3 * cellH + 'px',
        }, 400)
    }
}

function changeindex(left, top, index1) {
    if (left > imgareaW || top > imgareaH || left < 0 || top < 0) {
        return index1;
    } else {
        var i = Math.floor(left / cellW);
        var j = Math.floor(top / cellH);
        // return i + j * 3
        let x = 0,
            len = arrradom.length;
        while (x < len && (arrradom[x] !== (i + j * 3))) {
            x++
        }
        return x
    }
}

function cellreturn(index) {
    var j = arrradom[index] % 3;
    var i = Math.floor(arrradom[index] / 3);
    imgcell.eq(index).animate({
        'left': cellW * j + 'px',
        'top': cellH * i + 'px'
    }, 500)
}

function cellcheng(index1, index2) {
    console.log(index1 + ' ' + index2)

    imgcell.eq(index1).animate({
        'left': arrradom[index2] % 3 * cellW + 'px',
        'top': parseInt(arrradom[index2] / 3) * cellH + 'px',
    }, 300)
    imgcell.eq(index2).animate({
        'left': arrradom[index1] % 3 * cellW + 'px',
        'top': parseInt(arrradom[index1] / 3) * cellH + 'px',
    }, 300)
    var t = arrradom[index1];
    arrradom[index1] = arrradom[index2];
    arrradom[index2] = t
    console.log(arrradom)
    if (arrradom.toString() == arrorigin.toString()) {
        win()
    }
}

function win() {
    setTimeout(() => {
        alert('win')
        $('.start').text('开始')
        flag = true;
        imgcell.off('mousedown')
    }, 500);

}