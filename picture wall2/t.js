var picarr = [];

function createwall(arr, warp, picwidth) {

    for (let i in arr) {
        let pic = $('<img class="pic"></img>')
        pic.attr("src", arr[i])
        pic.css({
            "width": picwidth,
            "position": "absolute",
            "transition": " 1s",
            "top": "0",
            "left": "0"
        })
        warp.append(pic)
        picarr.push(pic);
    }

    window.onload = function() {
        numlt(arr)
    }

    window.onresize = function() {
        numlt(arr)
    }

    function numlt(arr) {

        let windowwidth = $(window).width();
        let maxj = Math.floor(windowwidth / 200);
        let maxi = Math.ceil(arr.length / maxj);
        let space = (windowwidth - maxj * 200) / (maxj + 1)
        console.log(maxj + " " + maxi)
        let colarr = [];
        for (let i = 0; i < maxj; i++) {
            colarr.push(0);
        }
        for (let i = 0; i < maxi; i++) {
            for (let j = 0; j < maxj; j++) {
                let left = 0;
                let top = 0;
                let nowpic = picarr[(i * maxj + j)]
                if (nowpic) {

                    if (j == 0) {
                        console.log(i + " " + j)
                        top = colarr[j] + space * (i + 1);
                        colarr[j] += nowpic.height();
                        nowpic.css({
                            "top": top,
                            "left": 0 + space
                        })
                    } else {
                        console.log(i + " " + j)
                        top = colarr[j] + space * (i + 1);
                        colarr[j] += nowpic.height();
                        left = picwidth * j + space * (j + 1);
                        nowpic.css({
                            "top": top,
                            "left": left
                        })
                    }
                }
                console.log(colarr);
            }
        }
    }
}