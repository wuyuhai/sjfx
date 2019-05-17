
var timer;
var hotItemsVue = new Vue({
	el: '#index_box',
	data: {
		nowpage:1,
		userarr:[],
		userfxselval:1,
		userhabbitselval:1
	},
	created: function() {		
		this.newpagesarr()
	},
	components: {
		
	},
	methods: {
		userpage(a){
			this.nowpage = a;
			this.newpagesarr();
			clearInterval(timer);
			this.userpagechange()
		},
		newpagesarr(){
			var arr = [{
				name:"吴玉海",
				num:52,
			},{
				name:"吴玉海",
				num:42,
			},{
				name:"吴玉海",
				num:41,
			},{
				name:"吴玉海",
				num:34,
			},{
				name:"吴玉海",
				num:31,
			},{
				name:"吴玉海",
				num:30,
			},{
				name:"吴玉海",
				num:29		
			},{
				name:"吴玉海",
				num:21,
			},{
				name:"吴玉海",
				num:18,
			},{
				name:"吴玉海",
				num:17,
			}];
			this.userarr = [];
			for(var i=0;i<2;i++){
				this.userarr.push(arr[2*(this.nowpage-1) + i])
			}
		},
		userpagechange(){
			var t = this
			timer = setInterval(function(){
				t.nowpage += 1;
				if(t.nowpage > 5){
					t.nowpage = 1
				}
				t.newpagesarr();
				$("#userpangesarr").fadeOut(500).fadeIn(500)
			},10000)
		},
		newuserzcchangefuc(){
			var xdata = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
				'17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
			];
			if(this.userfxselval == 2){
				xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
			};
			newuserzcfuc(xdata);
		},
		newuserhabbitchangefuc(){
			var legenddata = ['办件数', '预约数', '评价数'];
			var seriesdata = [{
					name: '办件数',
					type: 'line',
					stack: '总量',
					data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: '预约数',
					type: 'line',
					stack: '总量',
					data: [220, 182, 191, 234, 290, 330, 310, 150, 232, 201, 154, 190, 330, 410]
				},
				{
					name: '评价数',
					type: 'line',
					stack: '总量',
					data: [150, 232, 201, 154, 190, 330, 410, 220, 182, 191, 234, 290, 330]
				},
			]
			if(this.userhabbitselval == 2){
				legenddata = ['投诉数', '咨询数'];
				seriesdata = [{
						name: '投诉数',
						type: 'line',
						stack: '总量',
						data: [180, 112, 151, 94, 50, 230, 29, 190, 122, 191, 137, 56, 20, 150]
					},
					{
						name: '咨询数',
						type: 'line',
						stack: '总量',
						data: [220, 182, 191, 234, 290, 330, 310, 150, 232, 201, 154, 190, 330, 410]
					},
				]
			}
			newuserhabbitfuc(legenddata,seriesdata);
		}
	},
	mounted: function() {
		echartMap();
		this.newuserzcchangefuc();	
		this.newuserhabbitchangefuc();
		
		userbjkindfxfuc();		
		this.userpagechange()
	},
})

function userbjkindfxfuc(){
	var dom = document.getElementById("userbjkindfx");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	
	option = {
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c}次"
	    },
	    calculable: true,
	    series: [
	        {
	            name:'半件类型分析',
	            type:'funnel',
	            left: '25%',
	            top: 60,
	            //x2: 80,
	            bottom: 60,
	            width: '50%',
	            // height: {totalHeight} - y - y2,
	            min: 0,
	            max: 100,
	            minSize: '0%',
	            maxSize: '100%',
	            sort: 'ascending',
	            gap: 2,
	            label: {
	                show: true,
	                position: 'inside'
	            },
	            labelLine: {
	                length: 10,
	                lineStyle: {
	                    width: 1,
	                    type: 'solid'
	                }
	            },
	            itemStyle: {
	                borderColor: '#fff',
	                borderWidth: 1
	            },
	            emphasis: {
	                label: {
	                    fontSize: 20
	                }
	            },
	            data: [
	                {value: 60, name: '访问'},
	                {value: 40, name: '咨询'},
	                {value: 20, name: '订单'},
	                {value: 80, name: '点击'},
	                {value: 100, name: '展现'}
	            ]
	        }
	    ]
	};
	
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

function newuserhabbitfuc(legenddata,seriesdata) {
	var dom = document.getElementById("newuserhabbit");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: legenddata,
			bottom: '0%',		
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '12%',
			top:"5%",
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
		series: seriesdata
	};
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

function newuserzcfuc(xdata) {
	var dom = document.getElementById("newuserzc");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
		tooltip: {
			trigger: 'axis'
		},		
		grid: {
			left: '2.5%',
			right: '10%',
			bottom: '28%',
			top:"5%",
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: xdata,
			color: "#fff",
			axisLabel: {
				interval: 0,
				color: "#a2d4e6",
				fontSize: 10
			},
			axisLine: {
				lineStyle: {
					color: "rgba(82,255,255,0.2)",
					width: 2
				}
			},
			axisTick: {
				show: false,
			},
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				color: "#a2d4e6",
				fontSize: 10
			},
			axisLine: {
				lineStyle: {
					color: "rgba(82,255,255,0.2)",
					width: 1
				}
			},
			axisArea: {
				areaStyle: {
					color: 'rgba(0,0,0,0.3)',
				}
			},
			axisTick: { //轴上刻度
				show: false,
			},
			splitLine: { //表格刻度线
				show: true,
				lineStyle: {
					color: "rgba(13,31,67,0.6)",
				}
			},
		},
		series: [{
				name: '用户注册数',
				type: 'line',
				stack: '总量',
				data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
			}
		]
	};
	if(xdata.length != 12){
		option.dataZoom = [{
			type: "slider",
			show: true,
			height: '6%',
			xAxisIndex: [
				0
			],
			showDetail: false,
			bottom: 0,
			start: 0,
			bottom: '20%',
			end: 34,
			filterMode: 'empty',
			fillerColor:"#39d6fe",
			borderColor:"#1f4d86",
			handleSIze:"100%"
		}];
	}
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

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


