import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'myauthor-play-list',
	templateUrl: './playlist.component.html'
})

export class PlayListComponent implements OnInit {
	
	newPop = false;
	folderName;

	isFolder = true;

	data = [];
	loading = false;
	showTip = false;
	showMsg = "";
	

	page = 0;
	limit = 10;

	headImg = "./assets/images/headimg.png";
	videoImg = "./assets/images/listimg.jpg";

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

	closePop(){
		this.newPop = false;
	}
	createBtn(){
		this.newPop = true;
	}

	createFolderBtn(){
		console.log(this.folderName);
		if(this.folderName){
			this.insertFile();
		}else{
			this.showMsg = "请输入列表名称";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
		}
	}

	showVideoList(){
		this.isFolder = false;
	}
	showFolderList(){
		this.isFolder = true;
	}

	insertFile():void{
		this.loading = true;
		

		const params: Map<string, any> = new Map<string, any>();
		params.set("filename",this.folderName);
		params.set("uid",this.uid);
		
		let url = "/jqkj/circleFiles/insertFile";
		this.http.post(url, params, null).subscribe(data => {
			this.closePop();

			if(data.status == 0){
				this.showMsg = "创建成功";
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
