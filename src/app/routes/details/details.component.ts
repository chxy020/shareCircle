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

	uid;
	baseUrl;
	id;

	comment = [];

	tabType = 1;

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

		this.uid = window['context']['uid'];
		this.baseUrl = window["context"]["apiroot"];
		this.id = +this.route.snapshot.paramMap.get('id');


		this.findUserPublish();
	}

	meetClick(item):void{
        if(this.id==1){
            this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
        }else{
            this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
        }
	}

	back(){
		this.location.back();
	}
	
	changeTabType(t){
		this.tabType = +t;
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

				this.getCircleComment();
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}
	
	getCircleComment():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",this.detail.id);

		let url = "/jqkj/cricle/getCircleComment";
		this.http.get(url, params, null).subscribe(data => {
			if(data.status == 0){
				this.comment = data.data || [];

				// this.data = this.data.concat(list);

				// 锁定
				this.me.lock();
				// 无数据
				this.me.noData(true);

				setTimeout(()=>{
					this.me.resetload();
				},200);
			}

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	me;
	drapUp(me:any){
        console.log("drapUp-----");
        this.me = me;
        this.me.resetload();
        this.me.unlock();
		this.me.noData(false);
		
        // this.page = 1;
        // this.data = [];
        // this.getSelectedCircle();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        // this.page++;
        
	}
}
