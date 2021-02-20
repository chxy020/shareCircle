import { Component, OnInit, ViewChild, ElementRef, Injector, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
import { Location } from '@angular/common';

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

	data = [];
	page = 1;
	limit = 6;

	commentData = [];
	commentPage = 1;
	commentLimit = 6;
	lastPage = false;

	uid;
	baseUrl;
	id;

	tabType = 1;
	commentMsg = "";

	sharedPop = false;

	nickName;
	headImgUrl;
	openid;

	get getVideoPath(): string {
		return this.baseUrl + this.detail.video_path;
	}
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
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];

		
		this.baseUrl = window["context"]["apiroot"];
		this.id = +this.route.snapshot.paramMap.get('id');
		this.uid = this.route.snapshot.paramMap.get('uid');
		// http://circle.jinquntech.com/shared/details/132/5bea735b8c324eafbfd11b679eb758d01?nickname=%E9%99%88%E5%AE%A3%E5%AE%87&headimgurl=https:%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FQ0j4TwGTfTJcDcCYO1a2jSAnETNE4We13ZstzTAbY2lKo09NdrPic1x00Be3lqft0VuBiae5iakPM8LiaFZrVkM7yw%2F132
		this.route.queryParams.subscribe(params => {
			this.nickName = params["nickname"] || "";
			this.headImgUrl = params["headimgurl"] || "";
			this.openid = params["openid"] || "";
		});

		this.findUserPublish();
		this.getSelectedCircle();
		this.getCircleComment();
	}

	imgLoad(ele,img):void{
		this.render.setStyle(ele, 'background-image',  'url('+img+')');   
	}

	back(){
		this.location.back();
	}
	
	isWxLogin(){
		//判断有没有微信登录
		if(!this.nickName){
			let url = location.href;
			window.location.href="http://share.jinquntech.com/jqkj/wxShare/getWxCode?url=" + url;
		}
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


	downloadApp(){
		// this.router.navigate(['/shared/download']);
		window.location.href = "http://thinnas.com/download.html";
	}

	startApp(){
		window.location.href = "thinnas://thinnas";

		setTimeout(()=>{
			//起不来app,跳转到下载页面
			this.downloadApp();
		},500);
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
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	getSelectedCircle():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();

		let url = "/jqkj/cricle/getSelectedCircle";
		params.set("page",this.page);
		params.set("limit",this.limit);

		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];
				// list = list.filter(item=>item.id != this.detail.id);
				this.data = this.data.concat(list);
			}

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	nextPage(){
		this.commentPage++;
		this.getCircleComment();
	}

	getCircleComment():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",this.id);
		params.set("page",this.commentPage);
		params.set("limit",this.commentLimit);

		let url = "/jqkj/cricle/getCircleComment";

		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];

				this.commentData = this.commentData.concat(list);
				
				if(list.length < this.commentLimit){
					this.lastPage = true;
				}
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}


	addComment(){
		this.isWxLogin();

		if(!this.commentMsg){
			this.showMsg = "请输入评论信息";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("messages",this.commentMsg);
		params.set("uid",this.uid);
		params.set("circleId",this.id);
		params.set("headimgurl",this.headImgUrl);
		params.set("username",this.nickName);
		params.set("openid",this.openid);

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
				this.commentMsg = "";

				this.commentPage = 1;
				this.commentData = [];
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
		params.set("uid",this.uid);
		params.set("circleId",this.id);
		params.set("headimgurl",this.headImgUrl);
		params.set("username",this.nickName);
		params.set("openid",this.openid);

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
