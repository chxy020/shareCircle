import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

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
	
	detail:any = {};

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];
		this.uid = this.route.snapshot.paramMap.get('uid');
		this.getCircleMine();
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

	getCircleMine():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);

		let url = "/jqkj/circleMine/getCircleMine";
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

	
}
