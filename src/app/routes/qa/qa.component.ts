import { Component, OnInit, ViewChild, ElementRef, Injector, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'qa',
	templateUrl: './qa.component.html'
})

export class QaComponent implements OnInit {
	
	data1 = [];
	data2 = [];

	loading = false;
	showTip = false;
	showMsg = "";
	
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

	changeBtn(evt:MouseEvent,item:any){
		evt.preventDefault();
		evt.stopPropagation();

		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		// ipass = 1 & ispublish = 0   对应 设置允许发布
		// ipass = 1 & ispublish = 1  对应 设置允许查看
		// ipass = 2 & ispublish = 2  对应 拒绝
		
		// this.currentItem = item;
		// this.folderName = item.filename;
		// this.folderId = item.id;
		// this.newPopEdit = true;
		// this.newPop = true;
		let ispublish = item.ispublish == 1 ? 0 : 1;
		this.updateAddStatus2(item,item.ispass,ispublish);
	}

	reviewBtn(evt:MouseEvent,item:any,type:number){
		evt.preventDefault();
		evt.stopPropagation();

		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		// ipass = 1 & ispublish = 0   对应 设置允许发布
		// ipass = 1 & ispublish = 1  对应 设置允许查看
		// ipass = 2 & ispublish = 2  对应 拒绝
		
		// this.currentItem = item;
		// this.folderName = item.filename;
		// this.folderId = item.id;
		// this.newPopEdit = true;
		// this.newPop = true;
		if(type == 1){
			//设置允许发布
			this.updateAddStatus(item,1,0);
		}else if(type == 2){
			//设置允许查看
			this.updateAddStatus(item,1,1);
		}else{
			//拒绝
			this.updateAddStatus(item,2,2);
		}
	}

	updateAddStatus(item,ispass,ispublish):void{
		this.loading = true;
		

		const params: Map<string, any> = new Map<string, any>();
		params.set("addId",item.id);
		params.set("ispass",ispass);
		params.set("ispublish",ispublish);
		
		let url = "/jqkj/circleMine/updateAddStatus";
		this.http.post(url, params, null).subscribe(data => {

			if(data.status == 0){
				this.showMsg = "设置成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				item.ispass = ispass;
				item.ispublish = ispublish;
			
				this.page2 = 1;
				this.data2 = [];
				this.getAddCircleOk();
			}else{
				this.showMsg = data.msg;
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);
			}
			
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}
	updateAddStatus2(item,ispass,ispublish):void{
		this.loading = true;
		

		const params: Map<string, any> = new Map<string, any>();
		params.set("addId",item.id);
		params.set("ispass",ispass);
		params.set("ispublish",ispublish);
		
		let url = "/jqkj/circleMine/updateAddStatus";
		this.http.post(url, params, null).subscribe(data => {

			if(data.status == 0){
				this.showMsg = "设置成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				item.ispass = ispass;
				item.ispublish = ispublish;
			}else{
				this.showMsg = data.msg;
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);
			}
			
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
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

		let url = "/jqkj/circleMine/getAllAddCircleOk";
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
	drapUp(me:any){
		console.log("drapUp-----");
		// this.me1 = me;
		// this.me1.resetload();
		// this.me1.unlock();
		// this.me1.noData(false);

		// this.page1 = 1;
		// this.data1 = [];
		// this.getAddCircleNo();
    }
    drapDown(me:any){
		console.log("drapDown------------");
		// this.me1 = me;
		// this.page1++;
		// this.getAddCircleNo();
	}
	
}
