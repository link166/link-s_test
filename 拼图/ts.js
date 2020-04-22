var warp = $('.warp')
var width = warp.width();
var height = warp.height();
var cellW = width / 3;
var cellH = height / 3;
var arr = [];
var radarr = [];
var cells

createcell()
randomarr()
cellorder()

function createcell() {
    for (let i = 0; i < 9; i++) {
        arr.push(i);
        let cell = $('<div class="cell"></div>')
        cell.css({
            'width': cellW,
            'height': cellH,
            'top': Math.floor(i / 3) * cellH + 'px',
            'left': i % 3 * cellH + 'px',
            'line-height': cellH + 'px'
        })
        cell.text(i);
        warp.append(cell)
    }
    cells = $('.cell')
}

function randomarr() {
    for (let i = 0; i < 9; i++) {
        let j = Math.floor(Math.random() * 9);
        if (radarr.length > 0) {
            while (radarr.indexOf(j) > -1) {
                j = Math.floor(Math.random() * 9);
            }
        }
        radarr.push(j)

    }
    console.log(radarr)
}

function cellorder() {
    for (let i = 0; i < 9; i++) {
        cells.eq(i).css({
            'left': radarr[i] % 3 * cellW + 'px',
            'top': Math.floor(radarr[i] / 3) * cellH + 'px'
        })
    }
}

cells.on('mousedown', function(e) {
    var index1 = $(this).index();

    var left = e.pageX - cells.eq(index1).offset().left;
    var top = e.pageY - cells.eq(index1).offset().top;
    $(document).on('mousemove', function(ev) {
        cells.eq(index1).css({
            'z-index': '10',
            'left': ev.pageX - left - warp.offset().left + 'px',
            'top': ev.pageY - top - warp.offset().top + 'px'
        })
    }).on('mouseup', function(eve) {
        let x = eve.pageX - warp.offset().left;
        let y = eve.pageY - warp.offset().top
        let index2 = getindex2(index1, x, y)
        if (index1 == index2) {
            cells.eq(index1).animate({
                'left': radarr[index1] % 3 * cellW + 'px',
                'top': Math.floor(radarr[index1] / 3) * cellH + 'px'
            }, 500)
        } else {
            console.log(index1 + ' ' + index2)
            cells.eq(index1).animate({
                'left': radarr[index2] % 3 * cellW + 'px',
                'top': Math.floor(radarr[index2] / 3) * cellH + 'px'
            }, 500)
            cells.eq(index2).animate({
                'left': radarr[index1] % 3 * cellW + 'px',
                'top': Math.floor(radarr[index1] / 3) * cellH + 'px'
            }, 500)
            let t = radarr[index1];
            radarr[index1] = radarr[index2]
            radarr[index2] = t
            console.log(radarr)
        }
        $(document).off('mousemove').off('mouseup')
    })
})

function getindex2(index1, x, y) {
    if (x < 0 || y < 0 || x > warp.width() || y > warp.height()) {
        return index1
    } else {
        var i = Math.floor(x / cellW);
        var j = Math.floor(y / cellH);
        var k = 0;
        while (k < radarr.length && radarr[k] !== (i + j * 3)) {

            k++;
        }
        return k;
    }
}