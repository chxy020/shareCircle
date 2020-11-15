import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http';
import { SubjectService } from 'src/app/shared/services/subjectService.service';

@Component({
	selector: 'choice-list',
	templateUrl: './choice.component.html',
	styleUrls: ['./choice.component.css']
})

export class ChoiceComponent implements OnInit {
	
	// titles=["","设备绑定","姓名绑定"];
	// title;
	// id=1;
	userInfo = [];

	data = [];
	loading = true;
	me:any;

	page = 0;
	limit = 10;

	headImg = "./assets/images/default-touxiang.png";
	videoImg = "./assets/images/default-img.png";

	baseUrl = "";
	uid;

	keySearchSub:Subscription;
	keyWord;

    ngOnDestroy(): void {
        if (this.keySearchSub) {
            this.keySearchSub.unsubscribe();
        }
    }
	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private sub: SubjectService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];

		let keyword = window["context"]["keyWord"] || "";
		this.keyWord = keyword;
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];

		this.keySearchSub = this.sub.keyWordObservable.subscribe(
            () =>{
				let keyword = window["context"]["keyWord"] || "";
				this.keyWord = keyword;

				this.page = 1;
        		this.data = [];
				this.getSelectedCircle();
			}
		);

		this.getSelectUserInfo();
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

	headerClick(item):void{
		if(this.uid == item.uid){
			//自己的视频，进入自己首页
			this.router.navigate(['/myauthor/main']);
		}else{
			this.router.navigate(['/author/main/'+item.uid+'/'+(+item.isAdmin)]);
		}
	}
	
	getSelectUserInfo():void{

		const params: Map<string, any> = new Map<string, any>();

		let url = "/jqkj/circleMine/getSelectUserInfo";
		this.http.get(url, params, null).subscribe(data => {
			// console.log(data)
			if(data.status == 0){
				this.userInfo = data.data || [];
				this.replaceHeadImg();
			}
			// this.loading = false;
		}, error => {
			console.error(error);
			// this.loading = false;
		});
	}

	replaceHeadImg(){
		if(this.data.length > 0 && this.userInfo.length > 0){
			this.userInfo.forEach(item=>{
				this.data.map(item2=>{
					return item2.uid == item.uid ? item2.headimgurl = item.headimgurl : item.headimgurl;
				})
			})
		}
	}

	getSelectedCircle():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		

		let url = "/jqkj/cricle/getSelectedCircle";
		
		//判断关键字搜索
		if(this.keyWord){
			url = "/jqkj/cricle/search";
			params.set("title",this.keyWord);
			params.set("pageNum",this.page);
			params.set("limit",this.limit);
			params.set("circleUid",this.uid);
			params.set("type",0);
		}else{
			params.set("page",this.page);
			params.set("limit",this.limit);
		}

		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				let list = data.data || [];

				this.data = this.data.concat(list);
				this.replaceHeadImg();
				
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
        this.getSelectedCircle();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
        this.getSelectedCircle();
	}
	
	// setSenseName(item:any): void {
	// 	const params: Map<string, any> = new Map<string, any>();
	// 	params.set('name', item.name);
	// 	params.set('id', item.id);

	// 	//判断名字是否已存在
	// 	let obj = this.senseList.filter(t=>t.name==item.name && !t.del && t.id != item.id) || "";
	// 	if(obj!=""){
	// 		this.httpError("新建大屏名称" + item.name + "已存在");
	// 		return;
	// 	}

	// 	//this.config.isLoading = true;
	// 	this.http.post('/config/modifyName', params, this.senseapi).subscribe(data => {
	// 		if (data.status == 200) {
	// 			item.editname = false;
	// 		} else {
	// 			this.httpError("修改大屏名称失败");
	// 			// this.fadeOutAction('系统错误,请稍后重试...', false);
	// 		}
	// 	}, error => {
	// 		//   this.fadeOutAction('系统错误,请稍后重试...', false);
	// 	});
	// }
	// delSenseById(item:any): void {
	// 	const params: Map<string, any> = new Map<string, any>();
	// 	// params.set('id', item.id);


	// 	//this.config.isLoading = true;
	// 	this.http.post('/config/del/'+item.id, params, this.senseapi).subscribe(data => {
	// 		this.isShowDeleteBox = false;
	// 		if (data.status == 200) {
	// 			item.del = true;
	// 			this.deladd++;
	// 		} else {
	// 			this.httpError("删除大屏失败");
	// 			// this.fadeOutAction('系统错误,请稍后重试...', false);
	// 		}
	// 	}, error => {
	// 		this.isShowDeleteBox = false;
	// 		//   this.fadeOutAction('系统错误,请稍后重试...', false);
	// 	});
	// }

	
}
