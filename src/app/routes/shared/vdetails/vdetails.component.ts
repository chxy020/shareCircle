import { Component, OnInit, ViewChild, ElementRef, Injector, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
import { Location } from '@angular/common';

@Component({
	selector: 'shared-vdetails',
	templateUrl: './vdetails.component.html',
	styleUrls: ['./vdetails.component.css']
})

export class VDetailsComponent implements OnInit {
	
	headImg = "./assets/images/headimg.png";
	videoImg = "./assets/images/listimg.jpg";

	detail:any = {};
	loading = true;
	showTip = false;
	showMsg = "";

	

	name;
	url;
	token;
	source;
	eee;

	videoUrl = "";

	playStatus = 0;

	// get getVideoPath(): string {
	// 	return this.baseUrl + this.detail.video_path;
	// }
	get getVideoImagePath(): string {
		if(this.detail.video_image){
			return this.detail.video_image;
		}else{
			return this.videoImg;
		}
	}
	
	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private location: Location,
		private render: Renderer2,
		private router: Router
	) {
	}

	ngOnInit() {
		
		// var href = decodeURIComponent(location.href);

		// function getUrlParam(name) {
        //     //构造一个含有目标参数的正则表达式对象
        //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //     var uri = decodeURIComponent(window.location.search);
        //     //匹配目标参数
        //     var r = uri.substr(1).match(reg);
        //     //返回参数值
        //     if (r != null) return r[2]; return null;
        // }

		// console.log(getUrlParam("url"),getUrlParam("token"),getUrlParam("source"),getUrlParam("e"))

		// console.log(decodeURIComponent(location.href))

		
		this.route.queryParams.subscribe(params => {
			this.token = params["token"] || "";
			this.url = params["url"] || "";
			this.source = params["source"] || "";
			this.eee = params["e"] || "";
		});

		if(this.url){
			this.videoUrl = this.url + "?e=" + this.eee + "&token=" + this.token;
		}
		// // this.url = "http://dev-storage.jinquntech.com/d8870698-92ea-6b90-e2c2-2cbf86eef065?e=3507067302&token=wIs8o1zurZUHOKGMaoRfBkA_cH_M4bhE6UaJlEet:xNpud-FRNU34W8gd5QKfxQsCaMY="
		// console.log(this.token,this.url,this.source,this.eee)
	}

	imgLoad(ele,img):void{
		this.render.setStyle(ele, 'background-image',  'url('+img+')');   
	}

	back(){
		this.location.back();
	}
	
	downloadApp(){
		// this.router.navigate(['/shared/download']);
		window.location.href = "http://m.thinnas.com/download.html";
	}

	startApp(){
		window.location.href = "thinnas://thinnas";

		setTimeout(()=>{
			//起不来app,跳转到下载页面
			this.downloadApp();
		},500);
	}



	videoClick(){
		console.log("videoClick");
		if(this.playStatus == 1){
			this.playStatus = 0;
		}
	}

	videoPlayClick(){
		console.log("videopaly",this.playStatus);
		if(this.playStatus != 1){
			this.playStatus = 1;
		}
	}

	videoPlay(){
		console.log("videopaly");
		this.playStatus = 1;
	}
	
	videoPause(){
		console.log("videoPause");
		this.playStatus = 0;
	}















	isWxLogin(){
		//判断有没有微信登录
		// if(!this.nickName){
		// 	let url = location.href;
		// 	window.location.href="http://share.jinquntech.com/jqkj/wxShare/getWxCode?url=" + url;
		// }
	}

	commentBtn(){
		this.isWxLogin();
	}

	giveBtn(){
		this.isWxLogin();

		this.addGive();
	}

	downloadBtn(){
		this.isWxLogin();
	}


	

	findUserPublish():void{
		// this.loading = true;

		// const params: Map<string, any> = new Map<string, any>();
		// params.set("id",this.id);
		// params.set("uid",this.uid);

		// let url = "/jqkj/cricle/findUserPublish";
		// this.http.get(url, params, null).subscribe(data => {
		// 	// console.log(data)
		// 	if(data.status == 0){
		// 		this.detail = data.data || {};
		// 	}
		// 	this.loading = false;
		// }, error => {
		// 	console.error(error);
		// 	this.loading = false;
		// });
	}

	getSelectedCircle():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();

		let url = "/jqkj/cricle/getSelectedCircle";
		// params.set("page",this.page);
		// params.set("limit",this.limit);

		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];
				// this.data = this.data.concat(list);
			}

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	nextPage(){
		// this.commentPage++;
		this.getCircleComment();
	}

	getCircleComment():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		// params.set("circleId",this.id);
		// params.set("page",this.commentPage);
		// params.set("limit",this.commentLimit);

		let url = "/jqkj/cricle/getCircleComment";

		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];

				// this.commentData = this.commentData.concat(list);
				
				// if(list.length < this.commentLimit){
				// 	this.lastPage = true;
				// }
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}


	addComment(){
		this.isWxLogin();

		// if(!this.commentMsg){
		// 	this.showMsg = "请输入评论信息";
		// 	this.showTip = true;
		// 	setTimeout(() =>{
		// 		this.showTip = false;
		// 	},2500);
		// 	return;
		// }
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		// params.set("messages",this.commentMsg);
		// params.set("uid",this.uid);
		// params.set("circleId",this.id);
		// params.set("headimgurl",this.headImgUrl);
		// params.set("username",this.nickName);
		// params.set("openid",this.openid);

		let url = "/jqkj/cricle/commentWeixin";
		this.http.post(url, params, null).subscribe(data => {
			// console.log(data)
			if(data.status == 0){
				this.showMsg = "评论成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.detail.comment_num++;
				// this.commentMsg = "";

				// this.commentPage = 1;
				// this.commentData = [];
				this.getCircleComment();
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
		// params.set("uid",this.uid);
		// params.set("circleId",this.id);
		// params.set("headimgurl",this.headImgUrl);
		// params.set("username",this.nickName);
		// params.set("openid",this.openid);

		let url = "/jqkj/cricle/giveWeixin";
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
}
