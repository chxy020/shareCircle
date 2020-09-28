import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'myauthor-video-list',
	templateUrl: './videolist.component.html'
})

export class VideoListComponent implements OnInit {
	
	fileData = [];
	filePop = false;

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

		this.getFileList();
	}

	meetClick(item):void{
        // if(this.id==1){
        //     this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
        // }else{
        //     this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
        // }
	}

	videoClick(item):void{
		this.router.navigate(['/details/'+item.id]);
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

	addFolderPop(evt:MouseEvent,item:any){
		evt.preventDefault();
		evt.stopPropagation();

		if(!!item.filesId){
			return;
		}

		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		this.currentItem = item;

		this.filePop = true;
	}
	addRecommend(evt:MouseEvent,item:any){
		evt.preventDefault();
		evt.stopPropagation();

		if(+item.type === 0){
			return;
		}

		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		// let b = window.confirm("确认删除吗?");
		// if(b){
			
		// }

		this.currentItem = item;

		this.applySelected();
	}
	changeShowStatus(evt:MouseEvent,item:any){
		evt.preventDefault();
		evt.stopPropagation();
		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		this.currentItem = item;

		let isshow = +!item.isshow
		this.updateIsShow(isshow);
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
	
	currentFolderItem;
	folderItemClick(ele:any,item:any){
		this.fileData.map(item=>{
			return item.checked = false;
		});
		item.checked = true;
		this.currentFolderItem = item;
	}

	closePop(){
		this.filePop = false;
	}

	addFolder(){
		let filesId = this.currentFolderItem && this.currentFolderItem.id;
		if(!filesId){
			this.showMsg = "没有选择视频文件夹";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}
		let fileName = this.currentFolderItem.filename;
		this.movePublish(filesId,fileName);
	}


	movePublish(filesId,fileName):void{
		this.loading = true;
		

		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",this.currentItem.id);
		params.set("filesId",filesId);
		params.set("uid",this.uid);
		
		let url = "/jqkj/circleFiles/movePublish";
		this.http.post(url, params, null).subscribe(data => {
			this.closePop();

			if(data.status == 0){
				this.showMsg = "移入视频成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.currentItem.filesId = 1;
				this.currentItem.fileName = fileName;
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
		params.set("circleId",this.currentItem.id);
		params.set("uid",this.uid);
		
		let url = "/jqkj/circleMine/applySelected";
		this.http.post(url, params, null).subscribe(data => {
			this.closePop();

			if(data.status == 0){
				this.showMsg = "视频加精已申请";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.currentItem.type = 0;
				// this.currentItem.fileName = fileName;
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

	updateIsShow(isshow):void{
		this.loading = true;
		

		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",this.currentItem.id);
		params.set("isshow",isshow);
		
		let url = "/jqkj/circleMine/updateIsShow";
		this.http.post(url, params, null).subscribe(data => {
			this.closePop();

			if(data.status == 0){
				this.showMsg = "视频状态设置成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);

				this.currentItem.isshow = isshow;
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

	getFileList():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("page",this.page);
		params.set("limit",this.limit);
		params.set("uid",this.uid);
		
		let url = "/jqkj/circleFiles/getFileList";
		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];

				this.fileData = this.fileData.concat(list);

			}

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
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

	
	me:any;
	drapUp(me:any){
        console.log("drapUp-----");
        this.me = me;
        this.me.resetload();
        this.me.unlock();
		this.me.noData(false);
		
        this.page = 1;
        this.data = [];
        this.getUserCircle();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
        this.getUserCircle();
	}
	
}
