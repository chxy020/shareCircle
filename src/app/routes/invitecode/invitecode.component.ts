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

	appId = "";
	shareUrl = "";
	linkUrl = "";

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];
		this.appId = window['context']['appId'];
		this.shareUrl = window['context']['shareUrl'];
		
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

		this.linkUrl = this.shareUrl + "/shared/invitecode/" + this.sharedCode;
		
		// this.getWxSign();
	}

	sharedCodeWx(){
		let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		
		let condi = {
			"sharecode":this.sharedCode,
			"link":this.linkUrl,
		};

		if (isAndroid) {
            //这个是安卓操作系统
            // alert("android");
            // alert(window["circle"]);
            if(typeof window["circle"] != "undefined"){
                // alert(window["circle"].publishCircle)
                try{
                    window["circle"].invitationCodeShareCircle(JSON.stringify(condi));
                }catch(ex){
                    alert("invitationCodeShareCircle catch")
                }
                // var msg = circle.choiceJoinOrShareCircle();
                // var msg = H5JsStorage.showDetail("{'test':'123'}");
                // document.getElementById("native").innerHTML = "native响应：" + msg;
            }else{
                alert("circle不存在");
            }
        }
        if (isIOS) {
            //这个是ios操作系统
            // alert("ios");
            // if(typeof webkit != "undefined"){
            //     if(typeof webkit.messageHandlers != "undefined"){
            //         if(typeof webkit.messageHandlers.showDetail != "undefined"){
            //             var msg = webkit.messageHandlers.showDetail.postMessage("{'test':'123'}");
            //             document.getElementById("native").innerHTML = "native响应：" + msg;
            //         }else{
            //             alert("window.webkit.messageHandlers.showDetail不存在");
            //         }
            //     }else{
            //         alert("window.webkit.messageHandlers不存在");
            //     }
            // }else{
            //     alert("window.webkit不存在");
            // }
        }
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
			appId: this.appId, // 必填，公众号的唯一标识
			timestamp: data.timestamp , // 必填，生成签名的时间戳
			nonceStr: data.nonce, // 必填，生成签名的随机串
			signature: data.signature,// 必填，签名，见附录1
			jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","updateAppMessageShareData","updateTimelineShareData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
			// console.log("wx----ready---")
			let sdata = {
				imgUrl: "http://39.107.249.187:8082/jqkj/fileupload/video/3b3e353052a24476aed3d6b0dc41e572.jpg", // 分享图标
				link: this.linkUrl,
				title: "thinNAS邀请码", // 分享标题
				desc: "thinNAS邀请码，微信好友分享描述", // 分享描述
				success: function () {
					console.log("分享成功");
				},
				cancel: function () {
					console.log("分享失败");
				}
				
			};
			wx.updateAppMessageShareData(sdata);// 发送给朋友
			// wx.updateTimelineShareData(sdata);//分享到朋友圈
		}.bind(this));
		wx.error(function(res){
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			alert("抱歉，服务器初始化错误。");
			console.log(res);
		});
	}

	sharedTimeline(){
		wx.ready(function(){
			console.log("wx----ready---")
			let sdata = {
				imgUrl: "http://39.107.249.187:8082/jqkj/fileupload/video/3b3e353052a24476aed3d6b0dc41e572.jpg", // 分享图标
				link: this.linkUrl,
				title: "thinNAS邀请码", // 分享标题
				desc: "thinNAS邀请码，微信朋友圈分享描述", // 分享描述
				success: function () {
					console.log("分享成功");
				},
				cancel: function () {
					console.log("分享失败");
				}
				
			};
			// wx.updateAppMessageShareData(sdata);// 发送给朋友
			wx.updateTimelineShareData(sdata);//分享到朋友圈
		}.bind(this));
		wx.error(function(res){
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			alert("抱歉，服务器初始化错误。");
			console.log(res);
		});
	}
}
