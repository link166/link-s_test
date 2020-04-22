(function() {
    $.fn.extend({
        slider: function(options) {
            let picarr = []
            let index = 0
            let flag = true
            let warp = $('.warp')
            let {
                curDispaly = 0,
                    autoPlay = true,
                    interval = 2000
            } = options
            let len, hNum, lNum, rNum;
            let timer;

            function getpic() {
                for (let i = 0; i < 5; i++) {
                    let img = $(`<img src="./img/${i}.jpg" class="pic"></img>`)
                    warp.append(img)
                    picarr.push(img)
                }
                len = picarr.length;
                hNum = Math.floor(len / 2)
            }

            function setEle() {
                for (let i = 0; i < hNum; i++) {
                    lNum = curDispaly - i - 1 < 0 ? curDispaly - i - 1 + len : curDispaly - i - 1;
                    rNum = curDispaly + i + 1 > len - 1 ? curDispaly + i + 1 - len : curDispaly + i + 1;
                    $(picarr[lNum]).css({
                        transform: `translateX(${-200*(i+1)}px) translateZ(${200-i*100}px) rotateY(40deg)`
                    })
                    $(picarr[rNum]).css({
                        transform: `translateX(${200*(i+1)}px) translateZ(${200-i*100}px) rotateY(-40deg)`
                    })
                }
                $(picarr[curDispaly]).css({
                    transform: `translateZ(400px)`
                })
            }

            function ev() {
                for (let i of picarr) {
                    $(i).on('click', function() {
                        if (flag) {
                            flag = false
                            index = $(this).index()
                            console.log(index)
                            move(index)
                            setTimeout(function() {
                                flag = true
                            }, 1000)
                        }
                    }).hover(function() {
                        clearInterval(timer)
                    }, function() {
                        timer = setInterval(function() {
                            if (index == picarr.length - 1) {
                                index = 0
                            } else {
                                index++;
                            }
                            move(index)
                        }, interval)
                    })
                }
                timer = setInterval(function() {
                    if (index == picarr.length - 1) {
                        index = 0
                    } else {
                        index++;
                    }
                    move(index)
                }, interval)
            }

            function move(index) {
                curDispaly = index
                setEle()
            }


            getpic()
            setEle()
            ev()
        }
    })
})()