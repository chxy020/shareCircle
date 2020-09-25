import { Component, OnInit, ViewChild, ElementRef, Injector, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';


@Component({
	selector: 'invitecode',
	templateUrl: './invitecode.component.html'
})

export class InviteCodeComponent implements OnInit {
	
	data1 = [];
	data2 = [];

	loading = true;
	
	pageType = 1;

	page1 = 0;
	page2 = 0;
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

	reviewBtn(evt:MouseEvent,ele:any,type:number){
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

	getAddCircleOk():void{
		this.loading = true;

		// 全部：只填uid和page，limit
		// 可发布：只填ispublish=0和uid，page，limit
		// 仅查看：只填ispublish=1和uid，page，limit
		// 拒绝：只填ispass=2和uid，page，limit

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		// params.set("ispass",1);
		params.set("page",this.page2);
		params.set("limit",this.limit);

		let url = "/jqkj/circleMine/getAddCircleOk";
		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];

				this.data2 = this.data2.concat(list);

				if(list.length < this.limit){
					// 锁定
					this.me2.lock();
					// 无数据
					this.me2.noData(true);
				}

				setTimeout(()=>{
					this.me2.resetload();
				},200);
			}

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	getAddCircleNo():void{
		this.loading = true;

		// 全部：只填uid和page，limit
		// 可发布：只填ispublish=0和uid，page，limit
		// 仅查看：只填ispublish=1和uid，page，limit
		// 拒绝：只填ispass=2和uid，page，limit

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		params.set("ispass",0);
		params.set("page",this.page1);
		params.set("limit",this.limit);

		let url = "/jqkj/circleMine/getAddCircleOk";
		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];

				this.data1 = this.data1.concat(list);

				if(list.length < this.limit){
					// 锁定
					this.me1.lock();
					// 无数据
					this.me1.noData(true);
				}

				setTimeout(()=>{
					this.me1.resetload();
				},200);
			}

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	me1:any;
	me2:any;
	drapUp(me:any,t){
		console.log("drapUp-----");
		if(t==1){
			this.me1 = me;
			this.me1.resetload();
			this.me1.unlock();
			this.me1.noData(false);

			this.page1 = 1;
			this.data1 = [];
			this.getAddCircleOk();

		}else{
			this.me2 = me;
			this.me2.resetload();
			this.me2.unlock();
			this.me2.noData(false);
			
			this.page2 = 1;
			this.data2 = [];
			this.getAddCircleOk();
		}
    }
    drapDown(me:any,t){
		console.log("drapDown------------");
		if(t==1){
			this.me1 = me;
			this.page1++;
			this.getAddCircleNo();
		}else{
			this.me2 = me;
			this.page2++;
			this.getAddCircleOk();
		}
	}
	
}
