var hotItemsVue = new Vue({
	el: '#index_box',
	data: {

	},
	created: function() {

	},
	components: {

	},
	methods: {

	},
	mounted: function() {
		echartMap();
		zxqsfxfuc();
		tsqsfxfuc();
		zxrebackfuc();
		tsrebackfuc();
	},
})

function echartMap() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('echartMap'));
	var app = {};
	option = null;
	//	myChart.showLoading();

	var points = [{
		"name": "贵阳市",
		"value": [106.71090505872529, 26.83983918378913, 2],
		"symbolSize": 10,
		"itemStyle": {
			"normal": {
				"color": "#01d4f9",
			}
		},
		symbolSize: 15,
	}, {
		"name": "六盘水市",
		"value": [104.8969834455047, 26.12788964083519, 2],
		"symbolSize": 10,
		"itemStyle": {
			"normal": {
				"color": "#01d4f9"
			}
		}
	}, {
		"name": "遵义市",
		"value": [107.08945100872055, 28.16869676428591, 2],
		"symbolSize": 10,
		"itemStyle": {
			"normal": {
				"color": "#05d2fb"
			}
		}
	}, {
		"name": "安顺市",
		"value": [105.93218800872055, 26.24554476428591, 2],
		"symbolSize": 10,
		"itemStyle": {
			"normal": {
				"color": "#fbfc01"
			}
		}
	}, {
		"name": "毕节市",
		"value": [105.55022600872055, 27.11378976428591, 2],
		"symbolSize": 10,
		"itemStyle": {
			"normal": {
				"color": "#1e8ae8"
			}
		}
	}, {
		"name": "铜仁市",
		"value": [108.54634200872055, 27.97008176428591, 2],
		"symbolSize": 10,
		"itemStyle": {
			"normal": {
				"color": "#00CED1",
			},
		}
	}, {
		"name": "黔西南布依族苗族自治州",
		"value": [105.46708500872055, 25.26370376428591, 2],
		"symbolSize": 10,
		"itemStyle": {
			"normal": {
				"color": "#e79435",

			}
		}
	}, {
		"name": "黔东南苗族侗族自治州",
		"value": [108.56114100872055, 26.50498976428591, 2],
		"symbolSize": 10,
		"itemStyle": {
			"normal": {
				"color": "#01bb6e"
			}
		}
	}, {
		"name": "黔南布依族苗族自治州",
		"value": [107.25431500872055, 26.01441776428591, 2],
		"symbolSize": 10,
		"itemStyle": {
			"normal": {
				"color": "#00dcff"
			}
		}
	}];

	var geoCoordMap = {
		'贵阳市': [106.71090505872529, 26.83983918378913],
		'六盘水市': [104.8969834455047, 26.12788964083519],
		'遵义市': [107.08945100872055, 28.16869676428591],
		'安顺市': [105.93218800872055, 26.24554476428591],
		'毕节市': [105.55022600872055, 27.11378976428591],
		'铜仁市': [108.54634200872055, 27.97008176428591],
		'黔西南布依族苗族自治州': [105.46708500872055, 25.26370376428591],
		'黔东南苗族侗族自治州': [108.56114100872055, 26.50498976428591],
		'黔南布依族苗族自治州': [107.25431500872055, 26.01441776428591],
	};

	var BJData = [
		[{
			name: '六盘水市'
		}, {
			name: '贵阳市',
			value: 5
		}, {
			"color": "#01d4f9"
		}],
		[{
			name: '遵义市'
		}, {
			name: '贵阳市',
			value: 5
		}, {
			"color": "#05d2fb"
		}],
		[{
			name: '安顺市'
		}, {
			name: '贵阳市',
			value: 5
		}, {
			"color": "#fbfc01"
		}],
		[{
			name: '毕节市'
		}, {
			name: '贵阳市',
			value: 5
		}, {
			"color": "#1e8ae8"
		}],
		[{
			name: '铜仁市'
		}, {
			name: '贵阳市',
			value: 5
		}, {
			"color": "#00CED1",
		}],
		[{
			name: '黔西南布依族苗族自治州'
		}, {
			name: '贵阳市',
			value: 5
		}, {
			"color": "#e79435",
		}],
		[{
			name: '黔东南苗族侗族自治州'
		}, {
			name: '贵阳市',
			value: 5
		}, {
			"color": "#01bb6e"
		}],
		[{
			name: '黔南布依族苗族自治州'
		}, {
			name: '贵阳市',
			value: 5
		}, {
			"color": "#00dcff"
		}],
	];

	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

	var convertData = function(data) {
		var res = [];
		for(var i = 0; i < data.length; i++) {
			var dataItem = data[i];
			console.log(dataItem[2])
			var fromCoord = geoCoordMap[dataItem[0].name];
			var toCoord = geoCoordMap[dataItem[1].name];
			if(fromCoord && toCoord) {
				res.push({
					fromName: dataItem[0].name,
					toName: dataItem[1].name,
					coords: [fromCoord, toCoord],
					lineStyle: {
						normal: {
							color: dataItem[2].color,
							width: 1.5,
						}
					},
					effect: {
						color: dataItem[2].color,
					},
				});
			}
		}
		return res;
	};

	var series = [{
			name: '贵州省',
			type: 'map',
			geoIndex: 2,
			map: '贵州', // 自定义扩展图表类型，
			aspectScale: 1,
			roam:false,
			data: [
				{
					name: '贵阳市',
					value: 2,
					today: 12,
					month: 255,
					year: 9665
				},
				{
					name: '六盘水市',
					value: 5,
					today: 13,
					month: 255,
					year: 9123665
				},{
					name: '遵义市',
					value: 7,
					today: 192,
					month: 22325,
					year: 123665
				},{
					name: '安顺市',
					value: 3,
					today: 123,
					month: 135,
					year: 161235
				},{
					name: '毕节市',
					value: 6,
					today: 17,
					month: 2525,
					year: 961235
				},				
				{
					name: '铜仁市',
					value: 8,
					today: 42,
					month: 2532,
					year: 94365
				},							
				{
					name: '黔西南布依族苗族自治州',
					value: 4,
					today: 13,
					month: 255,
					year: 9123665
				},
				
				{
					name: '黔东南苗族侗族自治州',
					value: 1,
					today: 132,
					month: 2525,
					year: 96665
				},
				{
					name: '黔南布依族苗族自治州',
					value: 9,
					today: 22,
					month: 252,
					year: 9643565
				},
			],
			itemStyle: {
				normal: {
					areaColor: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(19,101,208,.99)'
							},
							{
								offset: 0.5,
								color: 'rgba(39,101,229,.99)'
							},
							{
								offset: 1,
								color: 'rgba(19,101,208,.99)'
							}
						]
					), //'#fff' linear-gradient(to bottom right, red , blue);		                
					borderColor: '#2e80c8',
					borderWidth: 1,
				},
				emphasis: {
					areaColor: '#053167'
				}
			},
			label: {
                normal: {  
                    textStyle: {
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                },
                color: '#fff'
            }, 
		},
		{
			type: 'scatter',
			coordinateSystem: 'geo',
			data: points,
			symbolSize: 10,
			symbol: 'circle',
			effect: {
				show: true,
				shadowBlur: 0
			},
			itemStyle: {
				normal: {
//					color: "red",
					borderColor: "rgba(23,68,199,0.5)",
					borderWidth: 5,
				}
			},
			label: {
				normal: {
					formatter: '{b}',
					position: 'top',
					show: true,
					color: "#fff"
				},
				emphasis: {
					show: true
				}
			},
		}
	];
	series.push({
		name: '贵阳  Top10',
		type: 'lines',
		zlevel: 1,
		effect: {
			show: true,
			period: 6,
			symbol: "arrow",
			symbolSize: 6
		},
		lineStyle: {
			normal: {
				curveness: 0.2,
			}
		},
		data: convertData(BJData)
	});

	myChart.setOption(option = {
		tooltip: {
			show: true,
			formatter: function(params) {
				var html = "<span style='color:#12c3ec'>" + params.data.name + "</span>" + "</br>本日办件数：" + params.data.today + "</br>本月办件数：" +
					params.data.month + "</br>本年办件数：" + params.data.year + "</br>";
				return [html].join('');
			},
		},
		geo: { //引入贵州省的地图
			map: '贵州',
			roam:false,
			zoom: 1,
			aspectScale: 1,
			itemStyle: {
				normal: {
					borderColor: '#2e80c8',
					shadowColor: '#003681',
					shadowBlur: 1,
					shadowOffsetY: 12,
					shadowOffsetX: -6,
				},
				emphasis: {
					areaColor: '#053167'
				}
			},
		},
		series: series		
	})
	myChart.setOption(option);
}

function zxqsfxfuc(){
	var dom = document.getElementById("zxqsfxfuc");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
	    xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
			color: "#fff",
			axisLabel: {
				color: "#a2d4e6",
				fontSize: 10
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: "rgba(82,255,255,0.2)",
					width: 2
				}
			},
		},
	    yAxis: {
			type: 'value',
			axisLabel: {
				color: "#a2d4e6",
				fontSize: 10
			},
			axisTick: {
				show: false,
			},
			splitLine: { //表格刻度线
				show: true,
				lineStyle: {
					color: "rgba(13,31,67,0.6)",
				}
			},
			axisLine: {
				lineStyle: {
					color: "rgba(82,255,255,0.2)",
					width: 1
				}
			},
		},
	    series: [{
	        data: [820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290],
	        type: 'line',
	        areaStyle: {
	        	normal:{
	        		color: {
					    type: 'linear',
					    x: 0,
					    y: 0,
					    x2: 0,
					    y2: 1,
					    colorStops: [{
					        offset: 0, color: 'rgba(67, 144, 250, 0.86)' // 0% 处的颜色
					    }, {
					        offset: 1, color: 'rgba(1, 212, 249, 0.93)' // 100% 处的颜色
					    }],
					    global: false // 缺省为 false
					}
	        	}        	
	        }
	    }]
	};

	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

function tsqsfxfuc(){
	var dom = document.getElementById("tsqsfxfuc");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
	    xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
			color: "#fff",
			axisLabel: {
				color: "#a2d4e6",
				fontSize: 10
			},
			axisTick: {
				show: false,
			},
			axisLine: {
				lineStyle: {
					color: "rgba(82,255,255,0.2)",
					width: 2
				}
			},
		},
	    yAxis: {
			type: 'value',
			axisLabel: {
				color: "#a2d4e6",
				fontSize: 10
			},
			axisTick: {
				show: false,
			},
			splitLine: { //表格刻度线
				show: true,
				lineStyle: {
					color: "rgba(13,31,67,0.6)",
				}
			},
			axisLine: {
				lineStyle: {
					color: "rgba(82,255,255,0.2)",
					width: 1
				}
			},
		},
	    series: [{
	        data: [80, 32, 91, 34, 129, 30, 10,82, 93, 9, 94, 90],
	        type: 'line',
	        areaStyle: {
	        	normal:{
	        		color: {
					    type: 'linear',
					    x: 0,
					    y: 0,
					    x2: 0,
					    y2: 1,
					    colorStops: [{
					        offset: 0, color: 'rgba(67, 144, 250, 0.86)' // 0% 处的颜色
					    }, {
					        offset: 1, color: 'rgba(1, 212, 249, 0.93)' // 100% 处的颜色
					    }],
					    global: false // 缺省为 false
					}
	        	}        	
	        }
	    }]
	};

	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

function zxrebackfuc(){
	Highcharts.setOptions({
        colors: ['rgb(218,144,42)','rgb(9,110,230)']
   	});
	var chart = Highcharts.chart('zxreback', {
	chart: {
		type: 'pie',
		options3d: {
			enabled: true,
			alpha: 45,
			beta: 0
		},
		backgroundColor:"rgba(0,0,0,0)",
		spacing:[10,10,35,10]
	},
	title: {
		text: ''
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			depth: 35,
			dataLabels: {
				enabled: true,
				format: '{point.name}'
			}
		},
	},
	series: [{
		type: 'pie',
		name: '浏览器占比',
		data: [		
			['未回复',    15],
			{
				name: '已回复',
				y: 50,
				sliced: true,
				selected: true
			},
		]
	}]
});
}

function tsrebackfuc(){
	Highcharts.setOptions({
        colors: ['rgb(63,164,230)','rgb(91,185,112)']
   	});
	var chart = Highcharts.chart('tsreback', {
	chart: {
		type: 'pie',
		options3d: {
			enabled: true,
			alpha: 45,
			beta: 0
		},
		backgroundColor:"rgba(0,0,0,0)",
		spacing:[10,10,35,10]
	},
	title: {
		text: ''
	},
	tooltip: {
		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: 'pointer',
			depth: 35,
			dataLabels: {
				enabled: true,
				format: '{point.name}'
			},
		},
	},
	series: [{
		type: 'pie',
		name: '浏览器占比',
		data: [		
			['未回复',    15],
			{
				name: '已回复',
				y: 50,
				sliced: true,
				selected: true
			},
		]
	}]
});
}