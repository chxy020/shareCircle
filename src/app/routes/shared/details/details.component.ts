import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
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
	page = 0;
	limit = 10;

	uid;
	baseUrl;
	id;

	tabType = 1;
	commentMsg = "";

	sharedPop = false;

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

		
		this.baseUrl = window["context"]["apiroot"];
		this.id = +this.route.snapshot.paramMap.get('id');
		this.uid = this.route.snapshot.paramMap.get('uid');


		this.findUserPublish();
		this.getSelectedCircle();
	}

	back(){
		this.location.back();
	}
	
	changeTabType(t){
		this.tabType = +t;
	}

	downloadApp(){
		this.router.navigate(['/shared/download']);
	}

	startApp(){
		window.location.href = "thinnas://thinnas";
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

				this.data = this.data.concat(list);
			}

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

}
