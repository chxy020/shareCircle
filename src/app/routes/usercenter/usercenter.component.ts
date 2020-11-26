import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'usercenter-main',
	templateUrl: './usercenter.component.html',
	// styleUrls: ['./usercenter.component.css']
})

export class UserCenterComponent implements OnInit {
	
	loading = true;
	showTip = false;
	showMsg = "";

	headImg = "./assets/images/default-touxiang.png";

	pageType = 1;

	baseUrl = "";
	uid;
	
	detail:any = {};

	editModel = false;


	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = this.uid = window['context']['uid'];
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];
		// this.uid = this.route.snapshot.paramMap.get('uid');
		this.getCircleMine();
	}

	showqa(i):void{
		if(i == 1){
			this.router.navigate(['/usercenter/circle']);
		}else if(i == 2){
			this.router.navigate(['/usercenter/createcircle']);
		}else if(i == 3){
			this.router.navigate(['/usercenter/addcircle']);
		}else if(i == 4){
			this.router.navigate(['/usercenter/gold']);
		}else if(i == 5){
			this.router.navigate(['/usercenter/shared']);
		}
		
	}

	getCircleMine():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		
		let url = "/jqkj/circleMine/getUserCircleMine";
		this.http.get(url, params, null).subscribe(data => {
			if(data.status == 0){
				this.detail = data.data || {};
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	updateCircleMine(){
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		params.set("loginName",this.detail.circleName);

		let url = "/jqkj/user/updateUser";
		this.http.post(url, params, null).subscribe(data => {
			if(data.status == 1){
				this.showMsg = "修改成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);
				this.editModel = false;
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
}
