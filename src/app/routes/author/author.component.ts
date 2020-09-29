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
		console.log(this.quitType)
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

	
}
