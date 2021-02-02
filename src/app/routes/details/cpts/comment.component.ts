import { Component, OnInit, ViewChild, ElementRef, Injector, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'comment-list',
	templateUrl: './comment.component.html'
})

export class CommentListComponent implements OnInit {
	@Input() circleId:any;
	@Input() refresh:any;

	data = [];
	loading = true;
	me:any;

	page = 0;
	limit = 6;

	headImg = "./assets/images/headimg.png";
	videoImg = "./assets/images/listimg.jpg";

	baseUrl = "";

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
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes['circleId'] && changes['circleId'].currentValue){
			this.circleId = changes['circleId'].currentValue;
			this.getFirstComment();
		}
		else if(changes['refresh'] && changes['refresh'].currentValue){
			this.refresh = changes['refresh'].currentValue;
			console.log("refresh-----",this.refresh)
			this.getFirstComment();
		}
    }

	getFirstComment():void{
		if(this.me){
			this.me.resetload();
			this.me.unlock();
			this.me.noData(false);
		}
		this.page = 1;
		this.data.length = 0;
		this.data = [];
		
		this.getCircleComment();
	}

	getCircleComment():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",this.circleId);
		params.set("page",this.page);
		params.set("limit",this.limit);

		let url = "/jqkj/cricle/getCircleComment";

		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];

				this.data = this.data.concat(list);

				if(list.length < this.limit){
					// 锁定
					this.me.lock();
					// 无数据
					this.me.noData(true);
				}

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


	drapUp(me:any){
        console.log("drapUp-----");
        this.me = me;
        this.me.resetload();
        this.me.unlock();
		this.me.noData(false);
		
        this.page = 1;
        this.data = [];
        this.getCircleComment();
    }
    drapDown(me:any){
        console.log("drapDown------------");
		this.me = me;
		if(this.circleId && this.page > 0){
			this.page++;
        	this.getCircleComment();
		}
	}
	
}
