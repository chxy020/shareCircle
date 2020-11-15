import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'self-play-list',
	templateUrl: './playlist.component.html'
})

export class PlayListComponent implements OnInit {
	
	@Output() public noData = new EventEmitter<any>();
	
	isFolder = true;
	filesName = "";
	
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

	meetClick(item):void{
        // if(this.id==1){
        //     this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
        // }else{
        //     this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
        // }
	}

	filesId;
	showVideoList(item){
		this.isFolder = false;
		this.filesId = item.id;
		this.filesName = item.filename;
	}
	showFolderList(){
		this.isFolder = true;
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
	
	renameBtn(evt:MouseEvent,item:any){
		evt.preventDefault();
		evt.stopPropagation();

		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		this.currentItem = item;
	}

	delBtn(evt:MouseEvent,item:any){
		evt.preventDefault();
		evt.stopPropagation();

		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		let b = window.confirm("确认删除吗?");
		if(b){
			
		}

		// this.folderName = item.filename;
		// this.folderId = item.id;
		// this.newPopEdit = true;
		// this.newPop = true;
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

				if(this.data.length == 0){
					this.noData.emit();
				}
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
        this.getFileList();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
        this.getFileList();
	}
	
}
