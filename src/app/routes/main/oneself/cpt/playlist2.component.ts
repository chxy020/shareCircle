import { Component, OnInit, ViewChild, ElementRef, Injector, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'self-play-list2',
	templateUrl: './playlist2.component.html'
})

export class PlayList2Component implements OnInit {
	
	@Input() filesId:String;
	@Input() filesName:String;
	@Output() public changeFolder = new EventEmitter<any>();
	
	data = [];
	loading = false;
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

	showFolder(){
		this.changeFolder.emit();
	}

	videoClick(item):void{
		if(!!item.isforward){
			this.router.navigate(['/details/'+item.forwardCircle]);
		}else{
			this.router.navigate(['/details/'+item.id]);
		}
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

	delBtn(evt:MouseEvent,item:any){
		evt.preventDefault();
		evt.stopPropagation();

		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		let circleId = item.id;

		let b = window.confirm("确认删除吗?");
		if(b){
			this.updateMovePublish(circleId);
		}

		// this.folderName = item.filename;
		// this.folderId = item.id;
		// this.newPopEdit = true;
		// this.newPop = true;
	}

	updateMovePublish(circleId):void{
		this.loading = true;
		

		const params: Map<string, any> = new Map<string, any>();
		params.set("circleId",circleId);
		params.set("filesId",0);
		
		let url = "/jqkj/circleFiles/updateMovePublish";
		this.http.post(url, params, null).subscribe(data => {
			if(data.status == 0){
				this.showMsg = "删除成功";
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);
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

	getOneFilesPublish():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("page",this.page);
		params.set("limit",this.limit);
		params.set("filesId",this.filesId);
		
		let url = "/jqkj/circleFiles/getOneFilesPublish";
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
        this.getOneFilesPublish();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
        this.getOneFilesPublish();
	}
	
	
	
}
