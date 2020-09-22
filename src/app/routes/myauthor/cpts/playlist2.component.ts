import { Component, OnInit, ViewChild, ElementRef, Injector, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'myauthor-play-list2',
	templateUrl: './playlist2.component.html'
})

export class PlayList2Component implements OnInit {
	@Output() public changeFolder = new EventEmitter<any>();
	
	data = [];
	loading = true;
	me:any;

	page = 0;
	limit = 10;

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

	showFolder(){
		this.changeFolder.emit();
	}

	
	getUserCircle():void{
		this.loading = true;
		let uid = window['context']['uid'];

		const params: Map<string, any> = new Map<string, any>();
		params.set("page",this.page);
		params.set("limit",this.limit);
		params.set("uid",uid);
		
		let url = "/jqkj/cricle/getUserCircle";
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
		
        // this.page = 1;
        // this.data = [];
        // this.getUserCircle();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
        // this.getUserCircle();
	}
	
	
	
}
