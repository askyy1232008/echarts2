function setNumber(dom, number) {
    var n = String(number),
        len = n.length;

    //如果新的数字短于当前的，要移除多余的i
    if (dom.find("i").length > len) {
        dom.find("i:gt(" + (len - 1) + ")").remove();
    }

    //移除千分位分隔符
    dom.find("b").remove();

    //开始填充每一位
    for (var i = 0; i < len; ++i) {
        //位数不足要补
        if (dom.find("i").length < len) {
            dom.append("<i></i>");
        }

        var obj = dom.find("i").eq(i);
        var y = -40 * parseInt(n.charAt(i), 10);

        //加分隔符
        // if (i < len - 1 && (len - i - 1) % 3 == 0)
        //     $("<b></b>").insertAfter(obj);

        //利用动画变换数字
        obj.animate({
            backgroundPositionY: y + "px"
        }, 2000);
    }
};
