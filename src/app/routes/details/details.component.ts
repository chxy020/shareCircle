import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
import { Location } from '@angular/common';
declare var wx:any;

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

	uid;
	baseUrl;
	id;

	tabType = 1;
	commentMsg = "";

	sharedPop = false;

	appId = "";
	shareUrl = "";
	linkUrl = "";

	get getVideoPath(): string {
		return this.baseUrl + this.detail.video_path;
	}
	get getVideoImagePath(): string {
		if(this.detail.video_image){
			return this.baseUrl + "/" + this.detail.video_image;
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

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];

		this.uid = window['context']['uid'];
		this.baseUrl = window["context"]["apiroot"];
		this.appId = window['context']['appId'];
		this.shareUrl = window['context']['shareUrl'];
		this.id = +this.route.snapshot.paramMap.get('id');

		this.linkUrl = this.shareUrl + "/details/" + this.id + "/" + this.uid;

		this.findUserPublish();
		this.getWxSign();
	}

	// meetClick(item):void{
    //     if(this.id==1){
    //         this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
    //     }else{
    //         this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
    //     }
	// }

	back(){
		this.location.back();
	}
	
	changeTabType(t){
		this.tabType = +t;
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

				// this.getFirstComment();
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	addComment(){
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
			if(data.status == 0){
				this.showMsg = "评论成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.detail.comment_num++;
				this.commentMsg = "";
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
			}else if(data.status ==  -1){
				this.showMsg = "点赞失败";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);
			}else if(data.status ==  -2){
				this.showMsg = "已经点过赞了";
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
		params.set("url",this.linkUrl);
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
			jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	}

	sharedAppMessage(){
		wx.ready(function(){
			console.log("wx----ready---")
			var sdata = {
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
		});
		wx.error(function(res){
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			alert("抱歉，服务器初始化错误。");
			console.log(res);
		});
	}
}
