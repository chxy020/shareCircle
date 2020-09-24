import { Component, OnInit, ViewChild, ElementRef, Injector, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';


@Pipe({
    name: 'circledatafilter'
})
export class CircleDataFilterPipe implements PipeTransform {
    transform(list:Array<any>, pageType?: any): any {
		console.log(pageType);
		if(pageType == 2){
			return list.filter(item=>item.ispublish == 0);
		}else if(pageType == 3){
			return list.filter(item=>item.ispublish == 1);
		}else if(pageType == 4){
			return list.filter(item=>item.ispass == 2);
		}
        return list;
    }
}


@Component({
	selector: 'myapply',
	templateUrl: './myapply.component.html'
})

export class MyApplyComponent implements OnInit {
	
	data = [];
	loading = true;
	
	pageType = 1;

	page = 0;
	limit = 10;

	headImg = "./assets/images/default-touxiang.png";
	videoImg = "./assets/images/default-img.png";

	baseUrl = "";
	uid;

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];
		// this.uid = this.route.snapshot.paramMap.get('uid');
		// this.getCircleMine();
	}

	changeType(i):void{
        this.pageType = i;
	}

	getAddCircleOk():void{
		this.loading = true;

		// 全部：只填uid和page，limit
		// 可发布：只填ispublish=0和uid，page，limit
		// 仅查看：只填ispublish=1和uid，page，limit
		// 拒绝：只填ispass=2和uid，page，limit

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		params.set("page",this.page);
		params.set("limit",this.limit);

		let url = "/jqkj/circleMine/getAddCircleOk";
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

	me:any;
	drapUp(me:any){
        console.log("drapUp-----");
        this.me = me;
        this.me.resetload();
        this.me.unlock();
		this.me.noData(false);
		
        this.page = 1;
        this.data = [];
        this.getAddCircleOk();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
        this.getAddCircleOk();
	}
	
}
