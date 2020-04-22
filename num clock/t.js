'use strict'

function Index(dom, use24) {
    this.string
    console.log(Array.from(dom))
    this.domarr = Array.from(dom)
    this.isuse24 = use24;
    this.time = 0;
    this.createdom();
    this.start()
    var self = this;
    var c = self.gettime();
    self.domarr.forEach(function(ele, index) {
        var n = +c[index];
        var offset = n * 60;
        $(ele).css({
            'transform': 'translateY(calc(50vh - ' + offset + 'px - 30px))'
        })
        Array.from($(ele).children()).forEach(function(ele, index) {
            $(ele).attr('class', 'far')
        })
        $(Array.from($(ele).children())[n]).removeClass('far').addClass('chocie')
        $(Array.from($(ele).children())[n]).next().removeClass('far').addClass('nearby')
        $(Array.from($(ele).children())[n]).prev().removeClass('far').addClass('nearby')
    });
}

Index.prototype.start = function() {
    var self = this;
    console.log(self)
    setInterval(() => {
        var c = self.gettime();
        self.domarr.forEach(function(ele, index) {
            var n = +c[index];
            var offset = n * 60;
            $(ele).css({
                'transform': 'translateY(calc(50vh - ' + offset + 'px - 30px))'
            })
            Array.from($(ele).children()).forEach(function(ele, index) {
                $(ele).attr('class', 'far')
            })
            $(Array.from($(ele).children())[n]).removeClass('far').addClass('chocie')
            $(Array.from($(ele).children())[n]).next().removeClass('far').addClass('nearby')
            $(Array.from($(ele).children())[n]).prev().removeClass('far').addClass('nearby')
        })
    }, 500)
}

Index.prototype.gettime = function() {
    var t = new Date();
    return [this.isuse24 ? t.getHours() : (t.getHours() % 12), t.getMinutes(), t.getSeconds()].reduce(function(a, b) {
        return (a + ('0' + b).slice(-2));
    }, '')
}

Index.prototype.createdom = function() {
    for (let i = 0; i < 3; i++) {
        var dom = '<div>' + i + '</div>';
        $('.num3').append(dom)
    }
    for (let i = 0; i < 6; i++) {
        var dom = '<div>' + i + '</div>';
        $('.num6').append(dom)
    }
    for (let i = 0; i < 10; i++) {
        var dom = '<div>' + i + '</div>';
        $('.num10').append(dom)
    }
    for (let i = 0; i < 5; i++) {
        var dom = '<div>' + i + '</div>';
        $('.num5').append(dom)
    }
}

Index.prototype.timemove = function() {

}

new Index($(".num"), true)