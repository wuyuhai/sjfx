var hotItemsVue = new Vue({
	el: '#index_box',
	data: {
		yearsdata:[],
		daysdata:[],
		yearbjtopfive:[],
		citymapdata1:[],
		citymapdata2:[],
	},
	created: function() {

	},
	components: {

	},
	methods: {
		bjlxtjfuc(){
			var data = {
				"begin":"2015-01-01 00:00:00",
				"end":"2019-06-01 00:00:00"
			}
			ajaxPostFuc(lrurl + "census/dashboard/type",{"Content-Type":"application/json"},JSON.stringify(data),function(e){
				if(e.code == 0){
					var datas = [],item;
					for(var i=0;i<e.data.data.length;i++){
						item = {
							value: e.data.data[i].second,
							name:  e.data.data[i].first
						}
						datas.push(item);
						totalBkind(datas)
					}										
				}
			},function(e){
				console.log(e)
			})
		},	
		nowYearfuc(){
			var years = [2017,2018,2019];
			this.yearsdata = [];
			for(var i = 0;i<years.length;i++){
				this.yearmapfun(1,years[i],i,years);
			}
		},
		nowMonthfuc(){
			var days = [["04-01","05-01"],["05-01","05-16"]];
			this.daysdata = [];
			for(var i = 0;i<days.length;i++){
				this.yearmapfun(2,days[i],i,days);
			}
		},
		yearmapfun(kind,time,b,c){
			var data;
			if(kind == 1){
				data = {
					"type":"month",
					"begin":time + "-00-01 00:00:00",
					"end":time + 1 + "-12-31 00:00:00"
				}
			}
			if(kind == 2){
				data = {
					"type":"day",
					"begin":"2019-"+time[0]+" 00:00:00",
					"end":"2019-"+time[1]+" 00:00:00",
				}
			}
			var t = this;
			ajaxPostFuc(lrurl + "census/dashboard/volume",{"Content-Type":"application/json"},JSON.stringify(data),function(e){
				if(e.code == 0){
					var datas = [];
					for(var i=0;i<e.data.data.length;i++){
						datas.push(e.data.data[i].second);					
					}
					if(kind == 1){
						t.yearsdata.push({"name":c[b],
						"datas":datas});
						if(b==c.length-1){
							setTimeout(function(){
								nowYear(t.yearsdata)
							},2000)						
						}
					}
					if(kind == 2){
						t.daysdata.push({"name":c[b][0],
						"datas":datas});
						if(b==c.length-1){
							setTimeout(function(){
								nowMonth(t.daysdata)
							},2000)	
						}
					}					
				}
			},function(e){
				console.log(e)
			})
		},			
		ywbmBarfuc(){
			var data = {
				"begin":"2015-01-00 00:00:00",
				"end":"2019-05-00 00:00:00"
				}
			var t = this;
			ajaxPostFuc(lrurl + "census/dashboard/dept",{"Content-Type":"application/json"},JSON.stringify(data),function(e){
				console.log(e)
				if(e.code == 0){
					if(e.data){
						var xdata=[],ydata=[];
						for(var i = 0;i<e.data.length;i++){
							xdata.push(e.data[i].deptName);
							ydata.push(e.data[i].sumNum);
						}
						setTimeout(function(){
							ywbmBar(xdata,ydata);
						},2000)
						var arr=e.data;
			            var max;
			            for(var i=0; i<arr.length; i++){
			                for(var j=i; j<arr.length; j++){
			                    if(arr[i].sumNum<arr[j].sumNum){
			　　　　　　　　　　　　　 max=arr[j];
			                        arr[j]=arr[i];
			                        arr[i]=max;
			                    }
			                }
			            }
			            t.yearbjtopfive = arr;
					}
				}
			},function(e){
				console.log(e)
			})
		},
		aeradept(){
			var citycode = ["520100","520200","520300","520400","520500","520600","522300","522600","522700"];	
			var cityname = ["贵阳市","六盘水市","遵义市","安顺市","毕节市","铜仁市","黔西南布依族苗族自治州","黔东南苗族侗族自治州","黔南布依族苗族自治州"];
			for(var i = 0;i<citycode.length;i++){
			    var data = {
			    	pageNum:1,
					pageSize:10000,
					regionId: citycode[i]
				}	
			    this.ajsitem(citycode[i],cityname[i])
			    this.ajsdept(citycode[i],cityname[i])
				
			}
			var t = this;
			setTimeout(function(){
				console.log(t.citymapdata1);
				console.log(t.citymapdata2);
				var newarr = [{},{},{},{},{},{},{},{},{}]
				for(var i=0;i<cityname.length;i++){
					newarr[i].name = cityname[i];
					for(var j=0;j<t.citymapdata1.length;j++){
						if(t.citymapdata1[j].name == cityname[i]){
							newarr[i].item =t.citymapdata1[j].item
						}
						if(t.citymapdata2[j].name == cityname[i]){
							newarr[i].dept =t.citymapdata2[j].dept
						}
					}					 
				}
				console.log(newarr)
				echartMap(newarr)
			},300000)
		},
		ajsitem(regionId,name){
			var t = this;
			ajaxPostFuc("https://gzzw.gzegn.gov.cn:84/UrbanService/statistics/item?pageNum=1&pageSize=10000&regionId=" + regionId,
			"",
			"",function(e){
				console.log(e)
				if(e.code == 200){
					t.citymapdata1.push({
						name:name,
						item:e.data.count,
					})
				}
			},function(e){
				console.log(e)
			})
		},
		ajsdept(regionId,name){
			var t = this;
			ajaxPostFuc("https://gzzw.gzegn.gov.cn:84/UrbanService/statistics/dept?pageNum=1&pageSize=10000&regionId=" + regionId,
			"",
			"",function(e){
				if(e.code == 200){
					t.citymapdata2.push({
						name:name,
						dept:e.data.count,
					})
				}
			},function(e){
				console.log(e)
			})
		}
	},
	mounted: function() {
//		echartMap();
		this.aeradept()
		
//		this.nowYearfuc();
//		this.nowMonthfuc();
//		
//		this.ywbmBarfuc();
		
		
		bjqkfxLine();
		
//		this.bjlxtjfuc()
	},
})

function totalBkind(data) {
	var dom = document.getElementById("totalbkind");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;

	option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		grid: {
			left: '25%',
			right: '15%',
			bottom: '15%',
			top: '15%',
			containLabel: true
		},
		color: ['red', 'green', 'yellow', 'blueviolet', '#a0428d'],
		series: [{
			name: '姓名',
			type: 'pie',
			radius: ['40%', '60%'],
			center: ['50%', '50%'],
			data: data,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};

	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
};

function nowYear(yearsdatas) {
	var dom = document.getElementById("nowyearbj");
	var myChart = echarts.init(dom);
	var app = {};
	var year19 = yearsdatas[0].name=="2019"?yearsdatas[0].datas:(yearsdatas[1].name=="2019"?yearsdatas[1].datas:yearsdatas[2].datas)
		year18 = yearsdatas[0].name=="2018"?yearsdatas[0].datas:(yearsdatas[1].name=="2018"?yearsdatas[1].datas:yearsdatas[2].datas)
		year17 = yearsdatas[0].name=="2017"?yearsdatas[0].datas:(yearsdatas[1].name=="2017"?yearsdatas[1].datas:yearsdatas[2].datas)
	option = null;
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['2019办件量', '2018办件量', '2017办件量']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
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
				name: '2019办件量',
				type: 'line',
				stack: '总量',
				data: year19
			},
			{
				name: '2018办件量',
				type: 'line',
				stack: '总量',
				data: year18
			},
			{
				name: '2017办件量',
				type: 'line',
				stack: '总量',
				data: year17
			}	
		]
	};
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

function nowMonth(daysdata) {
	var dom = document.getElementById("nowmonthbj");
	var myChart = echarts.init(dom);
	var app = {};
	var nowmonth = daysdata[0].name=="04-01"?daysdata[0].datas:daysdata[1].datas
		lastmonth = daysdata[0].name=="05-01"?daysdata[0].datas:daysdata[1].datas
	option = null;
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['本月办件量', '上月办件量']
		},
		dataZoom: [{
			type: "slider",
			show: true,
			height: '6%',
			xAxisIndex: [
				0
			],
			showDetail: false,
			bottom: 0,
			start: 0,
			bottom: '0.5%',
			end: 34,
			filterMode: 'empty',
			fillerColor:"#39d6fe",
			borderColor:"#1f4d86",
			handleSIze:"100%"
		}],
		grid: {
			left: '2.5%',
			right: '10%',
			bottom: '10%',
			top: '18%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
				'17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
			],
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
				name: '本月办件量',
				type: 'line',
				data: nowmonth
			},
			{
				name: '上月办件量',
				type: 'line',
				data: lastmonth
			},
		]
	};
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

function ywbmBar(a,b) {
	var dom = document.getElementById("ywbmbar");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
		xAxis: {
			type: 'category',
			data: a,
			axisLabel: {
				interval: 0,
				rotate: 48,
				color: "#00baff",
				fontWeight: 600,
				grid: {
					left: '10%',
					bottom: '35%'
				},
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
		grid: {
			left: '2.5%',
			right: '10%',
			bottom: '30%',
			top: '15%',
			containLabel: true
		},
		series: [{
			data: b,
			barWidth:40,
			type: 'bar',
			color: "#00BAFF",
		}]
	};
	
	if(a.length>10){	
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
			bottom: '0.5%',
			end: 10/a.length*100,
			filterMode: 'empty',
			fillerColor:"#39d6fe",
			borderColor:"#1f4d86",
			handleSIze:"100%"
		}]
	}
	
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

function bjqkfxLine() {
	var dom = document.getElementById("bjqkfxline");
	var myChart = echarts.init(dom);
	var app = {};
	option = null;
	option = {
		xAxis: {
			type: 'category',
			data: ['2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12', '2019-1', '2019-2', '2019-3', '2019-4', '2019-5'],
			axisLabel: {
				interval: 0,
				rotate: 60,
				align: "right",
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
		grid: {
			left: '2.5%',
			right: '10%',
			bottom: '25%',
			top: '18%',
			containLabel: true
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
				name: '本月办件量',
				type: 'line',
				data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90],
				smooth: true
			},
			{
				name: '上月办件量',
				type: 'line',
				data: [220, 182, 191, 234, 290, 330, 310, 150, 232, 201, 154, 190],
				smooth: true
			},
		]
	};
	if(option && typeof option === "object") {
		myChart.setOption(option, true);
	}
}

function echartMap(xdata) {
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
			data: xdata,
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
			//          trailLength: 0.1,
			//          color: '#fff',
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
				var html = "<span style='color:#12c3ec'>" + params.data.name + "</span>" + "</br>入住事项：" + 
				params.data.item + "</br>入住部门：" +params.data.dept;
				return [html].join('');
			},
		},
		geo: { //引入贵州省的地图
			map: '贵州',
//			label: {
//				emphasis: {
//					show: false
//				}
//			},
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
		//		series: [
		//			{
		//				name: "贵州省市级点分布",
		//				type: 'custom', //配置显示方式为用户自定义
		//				coordinateSystem: 'geo',
		//				itemStyle: {
		//					normal: {
		//						color: '#46bee9'
		//					}
		//				},
		//				renderItem: function(params, api) { //具体实现自定义图标的方法
		//					return {
		//						type: 'image',
		//						style: {
		//							image: "img/汽车.png",
		//							x: api.coord([
		//								points[params.dataIndex].value[0], points[params.dataIndex]
		//								.value[1]
		//							])[0],
		//							y: api.coord([
		//								points[params.dataIndex].value[0], points[params.dataIndex]
		//								.value[1]
		//							])[1],
		//							
		//						}
		//					}
		//				},
		//				data: points,
		//				}
		//		],
		//			visualMap: {
		//              show: true,
		//              min: 0, // 指定 visualMapContinuous 组件的允许的最小值。'min' 必须用户指定。[visualMap.min, visualMax.max] 形成了视觉映射的『定义域』。
		//              max: 10, // 指定 visualMapContinuous 组件的允许的最大值
		//              text: ['High', 'Low'], // 两端的文本，如 ['High', 'Low'] 如例子：http://www.echartsjs.com/gallery/editor.html?c=doc-example/map-visualMap-continuous-text&edit=1&reset=1
		//              realtime: false, // 拖拽时，是否实时更新。
		//              calculable: false, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
		//              hoverLink: false, // 打开 hoverLink 功能时，鼠标悬浮到 visualMap 组件上时，鼠标位置对应的数值 在 图表中对应的图形元素，会高亮。
		//              inRange: {
		//                  // inRange (object)定义 在选中范围中 的视觉元素。（用户可以和 visualMap 组件交互，用鼠标或触摸选择范围）1、symbol: 图元的图形类别。2、symbolSize: 图元的大小。3、color: 图元的颜色。4、colorAlpha: 图元的颜色的透明度。5、opacity: 图元以及其附属物（如文字标签）的透明度。6、
		//                  color: ['rgb(10,46,108)', 'rgb(29,101,201)','rgb(10,46,108)']
		//              },
		//         },			
	})
	myChart.setOption(option);
}