import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'myauthor-main',
	templateUrl: './myauthor.component.html',
	styleUrls: ['./myauthor.component.css']
})

export class MyAuthorComponent implements OnInit {
	
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

	changePage(i):void{
        this.pageType = i;
	}

	drapUpEvent(){
		this.getCircleMine();
	}
	getCircleMine():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);

		let url = "/jqkj/circleMine/getCircleMine";
		this.http.get(url, params, null).subscribe(data => {
			if(data.status == 0){
				this.detail = data.data || {};

				let num = this.detail.num || "";
				if(num){
					window.sessionStorage.setItem("__sharedcode",num);
				}else{
					window.sessionStorage.setItem("__sharedcode","");
				}
			}else{
				window.sessionStorage.setItem("__sharedcode","");
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
		params.set("circleName",this.detail.circleName);

		let url = "/jqkj/circleMine/updateCircleMine";
		this.http.post(url, params, null).subscribe(data => {
			if(data.status == 0){
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
