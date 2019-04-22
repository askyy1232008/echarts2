/*******************************获取屏幕大小************************************/
var winWidth = 0;
var winHeight = 0;
function findDimensions() //函数：获取尺寸
{
    //获取窗口宽度
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    //获取窗口高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    //通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    //结果输出至两个文本框
    // document.form1.availHeight.value = winHeight;
    // document.form1.availWidth.value = winWidth;
    // document.getElementById('testContainer').height = winHeight;
    // document.getElementById('testContainer').width  = winWidth;
    $('#testContainer').height(winHeight);
    $('#testContainer').width(winWidth);
}
findDimensions();
//调用函数，获取数值
window.onresize = findDimensions;﻿

/*******************************获取屏幕大小************************************/

var testContainer = document.getElementById('testContainer');

var testChart = echarts.init(testContainer);

var uploadedDataURL = "/json/china.json";
loading();
//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeWorldMapContainer() {

};
function loading() {
    $.getJSON(uploadedDataURL, function(geoJson) {
        echarts.registerMap('china', geoJson);
        testChart.setOption(options[0], true);
        // myChart2.setOption(myOptions[1], true);
        // myChart3.setOption(myOptions[2], true);
        //重置容器高宽
        resizeWorldMapContainer();
        testChart.resize();
        // myChart2.resize();
        // myChart3.resize();

        //用于使chart自适应高度和宽度
        window.onresize = function() {
            //重置容器高宽
            resizeWorldMapContainer();
            testChart.resize();
            // myChart2.resize();
            // myChart3.resize();
        };
    });
}
