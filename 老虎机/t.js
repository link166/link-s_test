//摇奖
var total = 5; //奖项个数
var $btnYao = $(".btn-yao");
var $btnBs = $(".btn-bs");
var flag = true; //控制是否可以摇奖
var arrPos = [0, 0, 0]; //存放当前位置
var arrNum = [0, 0, 0]; //存放随机数
var step = 3060; //控制转的步数
var tempArr;
var result; //抽奖结果

//产生随机数
function getNumb(n) {
    var num = new Array();
    var val;
    for (var i = 0; i < 3; i++) {
        val = Math.floor(Math.random() * n);
        num[num.length] = val;
    }
    return num;
}

$btnYao.on("click", function() {
    if (flag == true) {
        flag = false;
        $btnBs.addClass("active");
        $btnBs.on("webkitAnimationEnd", function() {
            $btnBs.removeClass("active");
            $(this).off("webkitAnimationEnd");
        });
        tempArr = arrNum;
        arrNum = getNumb(total);
        $(".prize li").each(function(i) {
            arrPos[i] += -step - ((arrNum[i] - tempArr[i]) <= 0 ? (arrNum[i] - tempArr[i] + total) : (arrNum[i] - tempArr[i])) * 102;
            $(this).css("background-position-y", arrPos[i] + "px");
        });
        $(".prize li").eq(2).on("webkitTransitionEnd", function() {
            flag = true; //摇奖结束重置开关
            $(this).off("webkitTransitionEnd");
            //中奖结果处理
            result = arrNum.join("");
            console.log(result);
            if (/0{3}/.test(result)) {
                alert("恭喜中了特等奖");
            } else if (/1{3}|2{3}|3{3}|4{3}/.test(result)) {
                alert("恭喜中了一等奖");
            } else if (/0\d?0/.test(result)) {
                alert("恭喜中了二等奖");
            } else if (/1\d?1|2\d?2|3\d?3|4\d?4/.test(result)) {
                // alert("恭喜中了三等奖");	
            } else {
                // alert("很遗憾没有中奖！");	
            }
        });
    }

})