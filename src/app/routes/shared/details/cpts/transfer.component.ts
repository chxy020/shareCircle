import { Component, OnInit, ViewChild, ElementRef, Injector, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'transfer-list',
	templateUrl: './transfer.component.html'
})

export class TransferListComponent implements OnInit {
	@Input() circleId:any;

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
        let circleId = changes['circleId'].currentValue || '';
		console.log("-----",circleId)
		if(circleId){
			this.getFirstPage();
		}
    }

	getFirstPage():void{
		this.data.length = 0;
		this.page = 1;

		this.getCircleTransfer();
	}

	getCircleTransfer():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",this.circleId);
		params.set("page",this.page);
		params.set("limit",this.limit);

		let url = "/jqkj/cricle/getCircleTransfer";

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
        this.getCircleTransfer();
    }
    drapDown(me:any){
        console.log("drapDown------------");
		this.me = me;
		if(this.circleId){
			this.page++;
        	this.getCircleTransfer();
		}
	}
	
}
