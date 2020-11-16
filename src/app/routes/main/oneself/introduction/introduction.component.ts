import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
import { Location } from '@angular/common';

@Component({
	selector: 'oneself-introduction',
	templateUrl: './introduction.component.html',
	// styleUrls: ['./introduction.component.css']
})

export class IntroductionComponent implements OnInit {
	
	loading = false;
	showTip = false;
	showMsg = "";

	headImg = "./assets/images/headimg.png";

	pageType = 1;

	baseUrl = "";
	uid;

	info;

	
	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private location: Location,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];
		this.uid = window['context']['uid'];
		this.baseUrl = window["context"]["apiroot"];

		// this.getImgOrName();
		let synopsis = window.sessionStorage.getItem("_synopsis") || "";
		this.info = synopsis;
	}

	back(){
		this.location.back();
	}
	
	saveInfo(){
		this.updateCircleMine();
	}

	updateCircleMine(){
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		params.set("synopsis",this.info);

		let url = "/jqkj/circleMine/updateCircleMine";
		this.http.post(url, params, null).subscribe(data => {
			if(data.status == 0){
				this.showMsg = "修改成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);
				// this.editModel = false;
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

	changePage(i):void{
        this.pageType = i;
	}
	
	getImgOrName():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);

		let url = "/jqkj/cricle/getImgOrName";
		this.http.get(url, params, null).subscribe(data => {
			if(data.status == 0){
				// this.detail = data.data || {};
				// this.getFirstComment();
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	myAuthorClick(){
		this.router.navigate(['/myauthor/main']);
	}
}
