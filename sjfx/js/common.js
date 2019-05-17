var lrurl = "http://10.168.1.158:8083/";

function ajaxPostFuc(url,headers,data,suc,fail,index){
	if(headers!=""){
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			headers: headers,
			timeout: 30000,
			data: data,
			success: function(e) {
				suc(e);
			},
			error: function (e) {
				fail(e)
			},
			complete: function(status){ //请求完成后最终执行参数
				if(status.statusText == 'timeout') {	
					if(index){
						layer.close(index);
					}				
					layer.alert("请求超时")
				}
			},
		})
	}else{
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
//			timeout: 30000,	
			data: data,
			success: function(e) {
				suc(e);
			},
			error: function (e) {
				fail(e)
			},
			complete: function(status){ //请求完成后最终执行参数
				if(status.statusText == 'timeout') {	
					if(index){
						layer.close(index);
					}
					layer.alert("请求超时")
				}
			},
		})
	}	
}
