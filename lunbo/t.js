function creatarea(dom, imgarr, time) {
    var imgarea = document.createElement("div");
    var iconarea = document.createElement("div");
    dom.style.position = 'relative';
    // dom.style.overflow = 'hidden';
    let len = imgarr.length;
    let index = 0;
    let changetime;
    let bol = true;
    let flag = true;
    let tf = 0;

    // 1  建立dom元素    图片
    initImg();
    // 2  轮播 组件
    initicon();
    //3  setstats
    setstats()
        //4  move
    automove()


    function initImg() {
        $(imgarea).css({
            'width': "100%",
            'height': "100%",
            'display': 'flex',
            'margin-left': '0'
        })
        $(imgarea).on('mouseenter', function() {
            clearInterval(changetime);
            changetime = null;
        })
        $(imgarea).on('mouseleave', function() {
            automove()
        })
        for (let index in imgarr) {
            let obj = imgarr[index];
            let img = new Image();
            img.src = obj.url;
            $(img).css({
                'width': "100%",
                'flex': "1 0 auto",
                'cursor': 'pointer'
            })
            $(img).on('click', function() {
                location.href = obj.link
            })
            imgarea.appendChild(img);
        }
        let obj = imgarr[0];
        let img = new Image();
        img.src = obj.url;
        $(img).css({
            'width': "100%",
            'flex': "1 0 auto"
        })
        imgarea.appendChild(img);
        dom.appendChild(imgarea)
    }

    function initicon() {
        $(iconarea).css({
            "position": "absolute",
            "textAlign ": 'center',
            'bottom': '0',
            'left': '50%',
            'transform': 'translateX(-50%)'
        })
        for (let i in imgarr) {
            let sp = document.createElement("span");
            $(sp).css({
                'width': '12px',
                'height': '12px',
                'display': 'inline-block',
                'background-color': "white",
                'border-radius': '50%',
                'margin-right': '7px',
                'cursor': 'pointer'
            })
            $(sp).attr('index', i);
            $(sp).on('click', function() {
                if (flag && tf == 0) {
                    flag = false
                    index = +$(sp).attr('index');
                    setstats();
                }
            })
            iconarea.appendChild(sp);
        }
        dom.appendChild(iconarea)
    }

    function setstats() {
        let sp = iconarea.children;
        for (let i in imgarr) {
            if (i == index) {

                $(sp[i]).css({
                    'background-color': "yellow"
                })
            } else {
                if (index >= len) {
                    $(sp[0]).css({
                        'background-color': "yellow"
                    })
                }
                $(sp[i]).css({
                    'background-color': "white"
                })
            }
        }

        let start = parseInt(imgarea.style.marginLeft)
        let end = index * -100;
        let dis = end - start;
        let t = 500;
        let speed = dis / t;
        if (j) {
            clearInterval(j)
        }
        var j = setInterval(() => {
            tf++;
            start += speed * 20;
            console.log(start)
            $(imgarea).css({
                'margin-left': start + '%'
            })
            if (Math.abs(end - start) < 1) {
                $(imgarea).css({
                    'margin-left': end + '%'
                })
                flag = true;
                tf = 0;
                clearInterval(j);
            }
        }, 17);
        // $(imgarea).css({
        //     'margin-left': '-' + (index * 100) + '%'
        // })
    }

    function automove() {
        changetime = setInterval(function() {
            if (index >= len - 1) {
                index = 0
            } else {
                index++;
            }
            setstats();
        }, time)
    }
}