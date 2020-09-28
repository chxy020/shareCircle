import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'mycircle',
	templateUrl: './mycircle.component.html'
})

export class MyCircleComponent implements OnInit {
	
	loading = true;

	pageType = 1;

	baseUrl = "";
	uid;
	
	detail:any = {};

	data = [];
	page = 0;
	limit = 10;

	headImg = "./assets/images/default-touxiang.png";
	videoImg = "./assets/images/default-img.png";

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

	videoClick(item):void{
		this.router.navigate(['/details/'+item.id]);
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
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}


	currentItem;
	currentMenuEle;
	eleOut;
	menuBtn(evt:MouseEvent,ele:any){
		evt.preventDefault();
		evt.stopPropagation();
		
		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		this.currentMenuEle = ele;
		ele.style.display = "block";

		clearTimeout(this.eleOut);
		this.eleOut = setTimeout(()=>{
			ele.style.display = "none";
		},3000);
	}

	delItem(evt:MouseEvent,item:any){
		evt.preventDefault();
		evt.stopPropagation();
		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		// this.currentItem = item;
		// this.folderName = item.filename;
		// this.folderId = item.id;
		// this.newPopEdit = true;
		// this.newPop = true;
	}
	
	
}
