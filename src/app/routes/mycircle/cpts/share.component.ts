import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'mycircle-share-list',
	templateUrl: './share.component.html'
})

export class ShareListComponent implements OnInit {
	
	data = [];
	loading = true;
	showTip = false;
	showMsg = "";

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
	}

	meetClick(item):void{
        // if(this.id==1){
        //     this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
        // }else{
        //     this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
        // }
	}

	videoClick(item):void{
		this.router.navigate(['/details/'+item.circleId]);
	}
	
	currentItem;
	currentMenuEle;
	eleOut;
	menuBtn(evt:MouseEvent,ele:any,item:any){
		evt.preventDefault();
		evt.stopPropagation();
		
		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}
		this.currentItem = item;

		this.currentMenuEle = ele;
		ele.style.display = "block";

		// clearTimeout(this.eleOut);
		// this.eleOut = setTimeout(()=>{
		// 	ele.style.display = "none";
		// },3000);
	}

	addRecommend(evt:MouseEvent){
		evt.preventDefault();
		evt.stopPropagation();
		let item = this.currentItem;
		if(+item.type === 0){
			return;
		}

		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}
		this.currentItem = item;

		this.applySelected();
	}

	delItem(evt:MouseEvent){
		evt.preventDefault();
		evt.stopPropagation();
		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}
		let item = this.currentItem;

		this.currentItem = item;
		let b = window.confirm("确认删除吗?");
		if(b){
			this.delectCircle();
		}
	}
	
	delcount = 0;
	delectCircle():void{
		this.loading = true;
		

		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",this.currentItem.circleId);
		
		let url = "/jqkj/cricle/delectCircle";
		this.http.post(url, params, null).subscribe(data => {
			if(data.status == 0){
				this.showMsg = "视频删除成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.currentItem.del = true;
				this.delcount++;
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

	applySelected():void{
		this.loading = true;
		

		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",this.currentItem.circleId);
		params.set("uid",this.uid);
		
		let url = "/jqkj/circleMine/applySelected";
		this.http.post(url, params, null).subscribe(data => {

			if(data.status == 0){
				this.showMsg = "视频加精已申请";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.currentItem.type = 0;
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
	
	getFriendShare():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("page",this.page);
		params.set("limit",this.limit);
		params.set("uid",this.uid);
		
		let url = "/jqkj/circleMine/getFriendShare";
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

	me;
	drapUp(me:any){
        console.log("drapUp-----");
        this.me = me;
        this.me.resetload();
        this.me.unlock();
		this.me.noData(false);
		
        this.page = 1;
        this.data = [];
        this.getFriendShare();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
        this.getFriendShare();
	}
	
}
