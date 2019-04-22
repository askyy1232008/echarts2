﻿ //获取window的高和宽
var winWidth = 0;
var winHeight = 0;

function findDimensions() { //函数：获取尺寸
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
}
findDimensions();
getData();
setNumber($("#dataNums"), lineContainerData[5]);

var mapContainer = document.getElementById('mapContainer');
// var lineContainer = document.getElementById('lineContainer');
var mapChart = echarts.init(mapContainer);
// var lineChart = echarts.init(lineContainer);
var uploadedDataURL = "/json/china.json";
loading();

//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function resizeWorldMapContainer() {
    findDimensions();
    $('#form').height(winHeight);
    $('#form').width(winWidth);
    $('#mapContainer').height($('#mapGround').height());
    $('#mapContainer').width($('#mapGround').width());
    $('#line').height($('#lineContainer').height());
    $('#line').width($('#lineContainer').width());
};

function loading() {
    $.getJSON(uploadedDataURL, function(geoJson) {
        echarts.registerMap('china', geoJson);
        mapChart.setOption(options[0], true);
        // lineChart.setOption(options[1], true);
        //重置容器高宽
        resizeWorldMapContainer();
        mapChart.resize();
        // lineChart.resize();
        //用于使chart自适应高度和宽度
        window.onresize = function() {
            //重置容器高宽
            resizeWorldMapContainer();
            mapChart.resize();
            // lineChart.resize();
        };
    });
}

function getData() {
    //需引入jQuery
    $.ajax({
        url: "http://sh.xingzhe5688.com:8080/SearchData/getData/getData", //sh.xingzhe5688.com
        type: "Get",
        cache: false,
        async: false,
        data: {
            'id': 1
        },
        dataType: "json",
        success: function(data) {
            //On ajax success do this
            console.info("get success.");
            var order = data.data.dorder;
            lineContainerData[5] = order;
        },
        error: function(xhr, ajaxOptions, thrownError) {
            //On error do this
            console.info("get error.");
            if (xhr.status == 200) {
                console.info(ajaxOptions);
            } else {
                console.info(xhr.status);
                console.info(thrownError);
            }
        }
    });
}

$(function() {
    //持续获取数据
    window.setInterval(function() {
        getData();
        setNumber($("#dataNums"), lineContainerData[5]);
        loading();
    }, 30000);
    /*$('#mapGround').on('click',function(){
      window.open('/map.html');
    });*/

})
