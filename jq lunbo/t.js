(function() {
    let picarr = []
    let index = 0
    let flag = true
    let warp = $('.warp')

    function getpic() {
        for (let i = 0; i < 5; i++) {
            let img = $(`<img src="./img/${i}.jpg" class="pic"></img>`)
            warp.append(img)
            picarr.push(img)
        }
    }

    getpic()

    function Slider(ele, opt) {
        let { corDisplay = 0, autoPlay = ture, interval = 2000 } = opt
        this.ops = {
            corDisplay,
            autoPlay,
            interval
        }
        this.warp = ele
        this.len = picarr.length;
        this.$img = this.warp.find('img')
        this.index = 0;
        this.amove()
        this.clickmove()
    }

    Slider.prototype.amove = function() {
        let hlen = Math.floor(this.len / 2)
        let lNum, rNum
        for (let i = 0; i < hlen; i++) {
            lNum = this.ops.corDisplay - i - 1
            this.$img.eq(lNum).css({
                transform: `translateX(${-250*(i+1)}px) translateZ(${200-i*100}px) rotateY(40deg)`
            })
            rNum = this.ops.corDisplay + i + 1 - this.len
            this.$img.eq(rNum).css({
                transform: `translateX(${250*(i+1)}px) translateZ(${200-i*100}px) rotateY(-40deg)`
            })
        }
        this.$img.eq(this.ops.corDisplay).css({
            transform: `translateZ(400px)`
        })
    }

    Slider.prototype.clickmove = function() {
        let self = this
        this.$img.on('click', function() {
            self.index = $(this).index()
            self.move(self.index)
        })

        this.$img.hover(function() {
            clearInterval(self.timer)
        }, function() {
            self.timer = setInterval(function() {
                self.play()
            }, self.ops.interval)
        })


        this.timer = setInterval(function() {
            self.play()
        }, this.ops.interval)
    }

    Slider.prototype.move = function(index) {
        this.ops.corDisplay = index
        this.amove()
    }

    Slider.prototype.play = function() {
        if (this.ops.autoPlay) {
            let interval = this.ops.interval
            if (this.index == this.len - 1) {
                this.index = 0
            } else {
                this.index++
            }
            this.move(this.index)
        }
    }

    $.fn.extend({
        slider: function(options) {
            new Slider(this, options)
        }
    })
})()