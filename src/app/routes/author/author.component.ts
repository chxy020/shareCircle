import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
import { SubjectService } from 'src/app/shared/services/subjectService.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'author-main',
	templateUrl: './author.component.html',
	styleUrls: ['./author.component.css']
})

export class AuthorComponent implements OnInit {
	
	loading = true;
	addCircle = false;
	showTip = false;
	showMsg = "";

	headImg = "./assets/images/default-touxiang.png";

	pageType = 1;

	baseUrl = "";
	uid;
	authorUid;

	detail:any = {};

	quitSub:Subscription;

	quitPop = false;
	quitType = "1";

    ngOnDestroy(): void {
        if (this.quitSub) {
            this.quitSub.unsubscribe();
        }
    }
	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private sub:SubjectService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];
	}

	ngOnInit() {
		this.quitSub = this.sub.quitCircleObservable.subscribe(
            (param:any) =>{
				this.quitPop = true;
			}
		);
		
		this.authorUid = this.route.snapshot.paramMap.get('uid');
		this.getAuthorInfo();
	}

	changePage(i):void{
        this.pageType = i;
	}
	
	addCircleSuccess(){
		this.addCircle = false;
	}
	closePop():void{
		this.addCircle = false;
	}
	addCircleBtn():void{
		this.addCircle = true;
	}

	quitEnter(){
		// console.log(this.quitType);
		this.quitCircle();
	}

	getAuthorInfo():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		params.set("authorUid",this.authorUid);

		let url = "/jqkj/circleMine/getAuthorInfo";
		this.http.get(url, params, null).subscribe(data => {
			this.detail = data || {};
			// this.detail.status = 0;

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	quitCircle():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		params.set("quitUid",this.authorUid);
		params.set("type",this.quitType);

		let url = "/jqkj/circleMine/quitCircle";
		this.http.post(url, params, null).subscribe(data => {
			if(data.status == 0){
				this.showMsg = "退出圈子成功";
				this.showTip = true;
				this.quitPop = false;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.getAuthorInfo();
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
