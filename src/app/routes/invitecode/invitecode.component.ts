import { Component, OnInit, ViewChild, ElementRef, Injector, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
declare var wx:any;

@Component({
	selector: 'invitecode',
	templateUrl: './invitecode.component.html'
})

export class InviteCodeComponent implements OnInit {
	loading = true;
	

	headImg = "./assets/images/default-touxiang.png";
	videoImg = "./assets/images/default-img.png";

	baseUrl = "";
	uid;

	sharedCode = "";

	sharedPop = false;

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];
		// this.uid = this.route.snapshot.paramMap.get('uid');
		// this.getCircleMine();

		let code = window.sessionStorage.getItem("__sharedcode") || "";
		if(code){
			this.sharedCode = code;
		}else{
			this.sharedCode = "";
		}

		this.getWxSign();
	}

	getWxSign(){
		//获取随机串
		let createNonceStr = function() {
		    return Math.random().toString(36).substr(2, 15);
		};
		    
		// timestamp
		let createTimeStamp = function () {
		    return new Date().getTime() / 1000 + '';
		};

		// 	data: {
		// 		url:location.href.split('#')[0], //url 如果写的是固定的值的话，分享之后在分享会报错
		// 		timestamp: createTimeStamp,
		// 		nonce: createNonceStr
		// 	},

		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("url",location.href.split('#')[0]);
		params.set("timestamp",createTimeStamp());
		params.set("nonce",createNonceStr());
		this.http.post("/jqkj/wxShare/getSignature", params, null).subscribe(data => {
			// console.log(wx);
			this.setWxSign(data);
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
		
		// $.ajax({
		// 	url:"http://39.107.249.187:8082/jqkj/wxShare/getSignature",
		// 	type:"post",
		// 	data: {
		// 		url:location.href.split('#')[0], //url 如果写的是固定的值的话，分享之后在分享会报错
		// 		timestamp: createTimeStamp,
		// 		nonce: createNonceStr
		// 	},
		// 	timeout: 10000, //超时时间设置为10秒；
		// 	success: function(data) {
		// 		console.log(data);
		// 		//微信初始化
		// 		wx.config({
		// 		    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		// 		    appId: "wx04ad9813254366a7", // 必填，公众号的唯一标识
		// 		    timestamp: data.timestamp , // 必填，生成签名的时间戳
		// 		    nonceStr: data.nonce, // 必填，生成签名的随机串
		// 		    signature: data.signature,// 必填，签名，见附录1
		// 		    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		// 		});
		// 		wx.ready(function(){
		// 		    var sdata = {
		// 		 		imgUrl: "http://39.107.249.187:8082/jqkj/fileupload/video/3b3e353052a24476aed3d6b0dc41e572.jpg", // 分享图标
		// 		 		link: "http://39.107.249.187:8082/jqkj/cricle/getSelectedCircle",
		// 		    	title: "测试微信分享", // 分享标题
		// 		 		desc: "分享描述", // 分享描述
		// 			    success: function () {
		// 					console.log("分享成功");
		// 			    },
		// 			    cancel: function () {
		// 					console.log("分享失败");
		// 			    }
					    
		// 			};
		// 		    wx.updateAppMessageShareData(sdata);// 发送给朋友
		// 		    wx.updateTimelineShareData(sdata);//分享到朋友圈
		// 		});
		// 		wx.error(function(res){
		// 		    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		// 			alert("抱歉，服务器初始化错误。");
		// 			console.log(res);
		// 		});
		// 	},
		// 	error:function(xhr, type, errorThrown){
		// 		alert("error");
		// 		//异常处理；
		// 		alert(xhr);
		// 		alert(type);
		// 		alert(errorThrown);
		// 	}
		// })
	}
	
	setWxSign(data:any){
		wx.config({
			debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: "wx04ad9813254366a7", // 必填，公众号的唯一标识
			timestamp: data.timestamp , // 必填，生成签名的时间戳
			nonceStr: data.nonce, // 必填，生成签名的随机串
			signature: data.signature,// 必填，签名，见附录1
			jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		// wx.ready(function(){
		// 	console.log("wx----ready---")
		// 	var sdata = {
		// 		imgUrl: "http://39.107.249.187:8082/jqkj/fileupload/video/3b3e353052a24476aed3d6b0dc41e572.jpg", // 分享图标
		// 		link: "http://39.107.249.187:8082/jqkj/cricle/getSelectedCircle",
		// 		title: "测试微信分享", // 分享标题
		// 		desc: "分享描述", // 分享描述
		// 		success: function () {
		// 			console.log("分享成功");
		// 		},
		// 		cancel: function () {
		// 			console.log("分享失败");
		// 		}
				
		// 	};
		// 	// wx.updateAppMessageShareData(sdata);// 发送给朋友
		// 	// wx.updateTimelineShareData(sdata);//分享到朋友圈
		// });
		// wx.error(function(res){
		// 	// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		// 	alert("抱歉，服务器初始化错误。");
		// 	console.log(res);
		// });
	}

	sharedAppMessage(){
		wx.ready(function(){
			console.log("wx----ready---")
			var sdata = {
				imgUrl: "http://39.107.249.187:8082/jqkj/fileupload/video/3b3e353052a24476aed3d6b0dc41e572.jpg", // 分享图标
				link: "http://39.107.249.187:8082/jqkj/cricle/getSelectedCircle",
				title: "测试微信分享", // 分享标题
				desc: "分享描述", // 分享描述
				success: function () {
					console.log("分享成功");
				},
				cancel: function () {
					console.log("分享失败");
				}
				
			};
			wx.updateAppMessageShareData(sdata);// 发送给朋友
			// wx.updateTimelineShareData(sdata);//分享到朋友圈
		});
		wx.error(function(res){
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			alert("抱歉，服务器初始化错误。");
			console.log(res);
		});
	}

	sharedTimeline(){
		wx.ready(function(){
			console.log("wx----ready---")
			var sdata = {
				imgUrl: "http://39.107.249.187:8082/jqkj/fileupload/video/3b3e353052a24476aed3d6b0dc41e572.jpg", // 分享图标
				link: "http://39.107.249.187:8082/jqkj/cricle/getSelectedCircle",
				title: "测试微信分享", // 分享标题
				desc: "分享描述", // 分享描述
				success: function () {
					console.log("分享成功");
				},
				cancel: function () {
					console.log("分享失败");
				}
				
			};
			// wx.updateAppMessageShareData(sdata);// 发送给朋友
			wx.updateTimelineShareData(sdata);//分享到朋友圈
		});
		wx.error(function(res){
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			alert("抱歉，服务器初始化错误。");
			console.log(res);
		});
	}
}
