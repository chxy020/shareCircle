import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
import { Location } from '@angular/common';
declare var wx:any;
// declare var sendCommentMsg:any;

// declare var ckplayer:any;

@Component({
	selector: 'video-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
	
	headImg = "./assets/images/headimg.png";
	videoImg = "./assets/images/listimg.jpg";

	detail:any = {};
	loading = true;
	showTip = false;
	showMsg = "";

	isGive = false;

	uid;
	baseUrl;
	id;

	tabType = 1;
	commentMsg = "";

	sharedPop = false;

	appId = "";
	shareUrl = "";
	linkUrl = "";

	commentRefresh = 0;
	giveRefresh = 0;

	userInfo = null;

	textBottom = "-2rem";
	@ViewChild('commentText',{static: true}) commentText: ElementRef;

	get getVideoPath(): string {
		return this.baseUrl + this.detail.video_path;
	}
	get getVideoImagePath(): string {
		if(this.detail.video_image){
			// return this.baseUrl + "/" + this.detail.video_image;
			return this.detail.video_image;
		}else{
			return this.videoImg;
		}
	}
	
	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private location: Location,
		private router: Router
	) {
	}

	ngOnDestroy(){
		console.log(1111111111111)
		clearTimeout(this.msgOut);
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];

		this.uid = window['context']['uid'];
		this.baseUrl = window["context"]["apiroot"];
		this.appId = window['context']['appId'];
		this.shareUrl = window['context']['shareUrl'];
		this.id = +this.route.snapshot.paramMap.get('id');

		this.linkUrl = this.shareUrl + "/shared/details/" + this.id + "/" + this.uid;

		this.updatePlayNum();
		this.findUserPublish();

		this.showBottom();
		

		// if(window["sendCommentMsg"]){
		// 	window["sendCommentMsg"]("",this,function(msg){
		// 		setTimeout(()=>{
		// 			this.commentMsg = msg;
		// 			this.addComment();
		// 		},300);
		// 	}.bind(this));
		// }

		

		// 视频详情页 打开的时候调用一下showBottom()   点击左上角调用hideBottom()
		// this.getWxSign();
	}

	createCircleQa(){
		this.router.navigate(['/usercenter/gold']);
	}

	// meetClick(item):void{
    //     if(this.id==1){
    //         this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
    //     }else{
    //         this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
    //     }
	// }

	showBottom(){
		let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

		if (isAndroid) {
            //这个是安卓操作系统
            // alert("android");
            // alert(window["circle"]);
            if(typeof window["circle"] != "undefined"){
                try{
                    window["circle"].showBottom();
                }catch(ex){
                    alert("showBottom catch")
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

	back(){
		let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

		if (isAndroid) {
            //这个是安卓操作系统
            // alert("android");
            // alert(window["circle"]);
            if(typeof window["circle"] != "undefined"){
                try{
                    window["circle"].hideBottom();
                }catch(ex){
                    alert("hideBottom catch")
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
		
		this.location.back();
	}
	

	showComment():void{
		let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		
		if (isAndroid) {
            //这个是安卓操作系统
            if(typeof window["circle"] != "undefined"){
                try{
					this.getCommentMsg();
					window["circle"].showBottomComment();
                }catch(ex){
                    alert("showBottomComment catch")
                }
            }else{
                alert("circle不存在");
            }
        }
	}

	msgOut = null;
	getCommentMsg():void{
		clearTimeout(this.msgOut);
		this.msgOut = setTimeout(()=>{
			let msg = window["__commentmsg"] || "";
			if(msg){
				window["__commentmsg"] = "";
				this.commentMsg = msg;
				this.addComment();
			}else{
				this.getCommentMsg();
			}
		},100);
	}

	headerClick(item):void{
		if(this.uid == '47231dcf8c0947b0baace15c4d21ad11'){
			this.showMsg = "游客身份，功能不可用";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}
		if(this.uid == item.uid){
			//自己的视频，进入自己首页
			this.router.navigate(['/myauthor/main']);
		}else{
			this.router.navigate(['/author/main/'+item.uid+'/'+(+item.isAdmin)]);
		}
	}

	changeTabType(t){
		this.tabType = +t;
	}
	
	sharedVideo(){
		if(this.uid == '47231dcf8c0947b0baace15c4d21ad11'){
			this.showMsg = "游客身份，功能不可用";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}

		let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		
		let condi = {
			"name":this.detail.title,
			"video_path":this.detail.video_path,
			"video_image":this.detail.video_image,
			"video_id":this.id,
			"link":this.linkUrl
		};

		if (isAndroid) {
            //这个是安卓操作系统
            // alert("android");
            // alert(window["circle"]);
            if(typeof window["circle"] != "undefined"){
                // alert(window["circle"].publishCircle)
                try{
                    window["circle"].shareCircle(JSON.stringify(condi));
                }catch(ex){
                    alert("shareCircle catch")
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

	downloadVideo(){
		if(this.uid == '47231dcf8c0947b0baace15c4d21ad11'){
			this.showMsg = "游客身份，功能不可用";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}

		let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		
		let condi = {
			"name":this.detail.title,
			"video_path":this.detail.video_path,
			"video_image":this.detail.video_image,
			"video_id":this.id
		};

		if (isAndroid) {
            //这个是安卓操作系统
            // alert("android");
            // alert(window["circle"]);
            if(typeof window["circle"] != "undefined"){
                // alert(window["circle"].publishCircle)
                try{
                    window["circle"].downloadToNasCircle(JSON.stringify(condi));
                }catch(ex){
                    alert("downloadToNasCircle catch")
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

	updatePlayNum():void{
		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",this.id);

		let url = "/jqkj/cricle/updatePlayNum";
		this.http.post(url, params, null).subscribe(data => {
		}, error => {
			console.error(error);
		});
	}

	getSelectUserInfo():void{

		const params: Map<string, any> = new Map<string, any>();

		let url = "/jqkj/circleMine/getSelectUserInfo";
		this.http.get(url, params, null).subscribe(data => {
			// console.log(data)
			if(data.status == 0){
				this.userInfo = data.data || [];

				this.replaceUserInfo();
			}
			// this.loading = false;
		}, error => {
			console.error(error);
			// this.loading = false;
		});
	}

	replaceUserInfo():void{
		if(this.userInfo.length > 0){
			this.userInfo.forEach(item=>{
				if(this.detail.uid == item.uid){
					this.detail.name = item.nick;
					this.detail.headimgurl = item.headimgurl;
				}
			})
		}
	}

	findUserPublish():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("id",this.id);
		params.set("uid",this.uid);

		let url = "/jqkj/cricle/findUserPublish";
		this.http.get(url, params, null).subscribe(data => {
			// console.log(data)
			if(data.status == 0){
				this.detail = data.data || {};

				if(!this.userInfo){
					this.getSelectUserInfo();
				}else{
					this.replaceUserInfo();
				}
				

				//定义一个变量：videoObject，用来做为视频初始化配置
				// var videoObject = {
				// 	container: '#nas_video_div', //“#”代表容器的ID，“.”或“”代表容器的class
				// 	variable: 'player', //播放函数名称，该属性必需设置，值等于下面的new ckplayer()的对象
				// 	video: this.detail.video_path//视频地址
				// };
				// var player = new ckplayer(videoObject);//初始化播放器


				// this.getFirstComment();
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	addComment(){
		if(this.uid == '47231dcf8c0947b0baace15c4d21ad11'){
			this.showMsg = "游客身份，功能不可用";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}

		if(!this.commentMsg){
			alert("请输入评论信息");
			return;
		}
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("messages",this.commentMsg);
		params.set("uid",this.uid);
		params.set("circleId",this.detail.id);

		let url = "/jqkj/cricle/comment";
		this.http.post(url, params, null).subscribe(data => {
			// console.log(data)
			window["__commentmsg"] = "";
			if(data.status == 0){
				this.showMsg = "评论成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.detail.comment_num++;
				this.commentMsg = "";

				console.log("commentRefresh-----",this.commentRefresh)
				this.commentRefresh++;
			}else{
				this.showMsg = data.msg;
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	addGive(){
		if(this.uid == '47231dcf8c0947b0baace15c4d21ad11'){
			this.showMsg = "游客身份，功能不可用";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}
		
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		params.set("circleId",this.detail.id);

		let url = "/jqkj/cricle/give";
		this.http.post(url, params, null).subscribe(data => {
			// console.log(data)
			// 0 成功 -1 失败 -2 已经点过赞了
			if(data.status == 0){
				this.showMsg = "点赞成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.detail.give_num++;

				this.giveRefresh++;

				this.isGive = true;
			}else if(data.status ==  -1){
				this.showMsg = "点赞失败";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.isGive = false;
			}else if(data.status ==  -2){
				this.showMsg = "已经点过赞了";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.isGive = true;
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
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
	}

	sharedAppMessage(){
		wx.ready(function(){
			console.log("wx----ready---")
			let sdata = {
				imgUrl: "http://39.107.249.187:8082/jqkj/fileupload/video/3b3e353052a24476aed3d6b0dc41e572.jpg", // 分享图标
				link: this.linkUrl,
				title: "thinNAS视频详情", // 分享标题
				desc: "thinNAS视频详情，微信好友分享描述", // 分享描述
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
				title: "thinNAS视频详情", // 分享标题
				desc: "thinNAS视频详情，微信好友分享描述", // 分享描述
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
