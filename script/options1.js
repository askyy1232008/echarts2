var options = [{
    // backgroundColor: '#020933',
    title: {
        top: 20,
        // left: 190,
        text: '', //标题
        subtext: '',
        sublink: '#', //subtext跳转地址
        left: 'center',
        // x: 'left',
        textStyle: {
            color: '#ccc'
        }
    },
    //浮层设置
    tooltip: {
        trigger: 'item',
        formatter: function(params, ticket, callback) {
            var $pna = params.name;
            var res = "";

            for (var i = 0; i < $imgs.length; i++) {
                if ($imgs[i].area == $pna) {
                    res = '<p>' + $imgs[i].txt + '</p>'; //设置自定义数据的模板，这里的模板是文字
                    //console.log(res);
                    break;
                }
            }

            setTimeout(function() {
                // 仅为了模拟异步回调
                callback(ticket, res); //回调函数，这里可以做异步请求加载的一些代码
            }, 15)
            return "loading";
        }
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'left',
        padding: [30, 100],
        data: [{
            name: '高安总部',
            icon: 'path://M100,0 L41.22,180.90 L195.10,69.09 L4.89,69.09 L158.77,180.90 z',
            textStyle: {
                fontSize: 18
            }
        }, {
            name: '已建分平台',
            textStyle: {
                fontSize: 18
            }
        }, {
            name: '待建分平台',
            textStyle: {
                fontSize: 18
            }
        }],
        itemWidth: 30,
        itemHeight: 30,
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false,
        itemStyle: {
            normal: {
                areaColor: 'transparent',
                borderColor: '#3fdaff',
                borderWidth: 2,
                shadowColor: 'rgba(63, 218, 255, 0.5)',
                shadowBlur: 30
            },
            emphasis: {
                areaColor: '#2B91B7', //#2B91B7
            }
        }
    },
    //调整显示级别  位置大小
    layoutCenter: ['48%', '50%'],
    layoutSize: 800,

    series: [{
        name: '待建分平台',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize: function(val) {
            // return val[2] / 10;
            return 10;
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            },
            emphasis: {
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#ddb926'
            }
        }
    }, {
        name: '已建分平台',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data.sort(function(a, b) {
            return b.value - a.value;
        }).slice(1, 7)),
        symbolSize: function(val) {
            // return val[2] / 10;
            return 15;
        },
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: false
            }
        },
        itemStyle: {
            normal: {
                // color: '#f4e925',
                color: 'red',
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        zlevel: 1
    }, {
        name: '高安总部',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: data1,
        symbolSize: 30,
        hoverAnimation: true,
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            emphasis: {
                formatter: '{b}',
                position: 'right',
                show: true
            }
        },
        zlevel: 1
    }, {
        name: '线路',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        large: true,
        effect: {
            show: true,
            constantSpeed: 30,
            symbol: 'pin',
            symbolSize: 3,
            trailLength: 0,
        },
        lineStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    //color: '#58B3CC'
                    color: 'red'
                }, {
                    offset: 1,
                    //color: '#F58158'
                    color: 'red'
                }], false),
                width: 1,
                opacity: 0.8,
                curveness: 0.1
            }
        },
        data: cityData.moveLines
    }]
}];
