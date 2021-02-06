import { Component, OnInit, ViewChild, ElementRef, Injector, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http';
import { SubjectService } from 'src/app/shared/services/subjectService.service';
import { debounceTime } from 'rxjs/operators';
import { Location } from '@angular/common';
declare var $;

@Component({
	selector: 'search-list',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
	
	// titles=["","设备绑定","姓名绑定"];
	// title;
	// id=1;
	showTip = false;
	showMsg = "";
	
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

	
	



	searchTermStream = new Subject(); 
	keySub:Subscription;

	@ViewChild('term',{static: true}) term: ElementRef;
	keyWord = "";
	menus:Array<any> = [];
	showMenus = false;

	searchKeyList = [];
	showKeyList = true;

    ngOnDestroy(): void {
        if (this.keySub) {
            this.keySub.unsubscribe();
        }
	}
	
	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private sub: SubjectService,
		private render: Renderer2,
		private location: Location,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];

		// let keyword = window["context"]["keyWord"] || "";
		// this.keyWord = keyword;
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];

		this.uid = window["context"]["uid"];

        if(this.uid != '47231dcf8c0947b0baace15c4d21ad11'){
            this.menus = [
                {id:1,name:"精选",current:true},
                {id:2,name:"关注",current:false},
                {id:3,name:"我的圈子",current:false}
            ];
        }else{
            this.menus = [
                {id:1,name:"精选",current:true}
            ];
		}
		
		this.getMineNavigation();

		this.keySub = this.searchTermStream.pipe(debounceTime(500)).subscribe((keyword:string) => {
			if(!this.keyWord){
				//清空数据
				this.data.length = 0;

				// 无数据
				this.me.noData(true);
				setTimeout(()=>{
					this.me.resetload();
				},200);
			}
		});

		this.getHistoryKey();
	}


	back(){
        this.location.back();
	}
	
	imgLoad(ele,img):void{
		this.render.setStyle(ele, 'background-image',  'url('+img+')');   
	}

	menuClick(item:any):void{
		this.menus.map((item)=>item.current=false);
		item.current = true;
		this.page = 1;
        this.data = [];
		this.getSelectedCircle();
	}

	historyKeySearch(item):void{
		this.keyWord = item;
		this.page = 1;
        this.data = [];
		this.getSelectedCircle();

		this.saveKeyWord(item);
		this.showMenus = true;
		this.showKeyList = false;
	}

	getHistoryKey():void{
		//首先判断关键字 在不在历史记录
		let keyList:any = window.localStorage.getItem(this.uid+"_keyword") || "";
		if(keyList){
			try{
				keyList = JSON.parse(keyList);
			}catch(ex){}
		}else{
			keyList = [];
		}

		this.searchKeyList = keyList;
	}

	getMineNavigation():void{
        if(this.uid == '47231dcf8c0947b0baace15c4d21ad11'){
			return;
        }
        
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);

		let url = "/jqkj/circleMine/getMineNavigation";
		this.http.get(url, params, null).subscribe(data => {
			if(data.status == 0){
				// this.menus.map((item)=>item.current=false);
				
                let list = data.data || [];
                list.forEach((item,index)=>{
					if(this.uid != item.uid){
                        this.menus.push({
							"id":4,
                            "uid":item.uid,
                            "name":item.circleName
                        });
                    }
                });
			}

			console.log(this.menus)
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
    }

	searchSubmit(evt:MouseEvent){
		//拦截表单默认提交事件
		if(evt){
			evt.preventDefault();
		}
		this.term.nativeElement.blur();
		this.getSelectedCircle();

		this.showMenus = true;
		this.showKeyList = false;
		//保存关键字
		if(this.keyWord){
			this.saveKeyWord(this.keyWord);
		}
	}

	clearKeyWord(){
		this.keyWord = '';
		this.showMenus = false;
		this.showKeyList = true;
		this.page = 1;
        this.data = [];
	}

	clearAllKey(){
		window.localStorage.setItem(this.uid+"_keyword","");
		this.searchKeyList = [];
	}

	saveKeyWord(key){
		//首先判断关键字 在不在历史记录
		let keyList:any = window.localStorage.getItem(this.uid+"_keyword") || "";
		if(keyList){
			try{
				keyList = JSON.parse(keyList);
			}catch(ex){}
		}else{
			keyList = [];
		}

		let has = keyList.filter(item=>{
			return item == key;
		});
		if(has.length > 0){
			//在里面
			let si = keyList.indexOf(key);
			
			//删除原来的数据
			keyList.splice(si,1);
		}
		
		//添加到最前面
		keyList.unshift(key);

		if(keyList.length > 10){
			keyList.length = 10;
		}

		this.searchKeyList = keyList;
		//保存到本地

		window.localStorage.setItem(this.uid+"_keyword",JSON.stringify(keyList));
	}


	keyWordSearch(term:string) {
        this.searchTermStream.next(term); 
	}

	videoClick(item):void{
		this.router.navigate(['/details/'+item.id]);
	}

	headerClick(item):void{
		if(this.uid == '47231dcf8c0947b0baace15c4d21ad11'){
			this.showMsg = "游客身份，功能不可用";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}

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
		if(!this.keyWord){
			// 无数据
			this.me.noData(true);
			setTimeout(()=>{
				this.me.resetload();
			},200);
			return;
		}

		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();

		let url = "/jqkj/cricle/search";
		

		let menu = this.menus.filter(item=>{
			return item.current == true;
		})[0] || {};

		params.set("title",this.keyWord);
		params.set("pageNum",this.page);
		params.set("limit",this.limit);
		params.set("circleUid",menu.uid ? menu.uid : this.uid);
		params.set("type",menu.id - 1);

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
}
