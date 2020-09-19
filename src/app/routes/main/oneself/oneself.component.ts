import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'oneself-list',
	templateUrl: './oneself.component.html',
	styleUrls: ['./oneself.component.css']
})

export class OneSelfComponent implements OnInit {
	
	loading = true;

	headImg = "./assets/images/headimg.png";

	pageType = 1;

	baseUrl = "";
	uid;

	detail = {};

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
		this.uid = window['context']['uid'];
		this.baseUrl = window["context"]["apiroot"];

		this.getImgOrName();
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
				this.detail = data.data || {};
				// this.getFirstComment();
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}
}
