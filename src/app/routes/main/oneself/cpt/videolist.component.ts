import { Component, OnInit, ViewChild, ElementRef, Injector, Output, EventEmitter, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http';
import { SubjectService } from 'src/app/shared/services/subjectService.service';

@Component({
	selector: 'self-video-list',
	templateUrl: './videolist.component.html'
})

export class VideoListComponent implements OnInit {
	
	// @Output() public noData = new EventEmitter<any>();
	noData = false;

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
		private render: Renderer2,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];

		let keyword = window["context"]["keyWord"] || "";
		this.keyWord = keyword;
	}

	ngOnInit() {
		this.keySearchSub = this.sub.keyWordObservable.subscribe(
            () =>{
				let keyword = window["context"]["keyWord"] || "";
				this.keyWord = keyword;

				this.page = 1;
        		this.data = [];
				this.getUserCircle();
			}
		);
	}

	meetClick(item):void{
        // if(this.id==1){
        //     this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
        // }else{
        //     this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
        // }
	}

	imgLoad(ele,img):void{
		this.render.setStyle(ele, 'background-image',  'url('+img+')');   
	}

	videoClick(item):void{
		if(!!item.isforward){
			this.router.navigate(['/details/'+item.forwardCircle]);
		}else{
			this.router.navigate(['/details/'+item.id]);
		}
	}
	
	getUserCircle():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		
		
		let url = "/jqkj/cricle/getUserCircle";
		//判断关键字搜索
		if(this.keyWord){
			url = "/jqkj/cricle/search";
			params.set("title",this.keyWord);
			params.set("pageNum",this.page);
			params.set("limit",this.limit);
			params.set("circleUid",this.uid);
			params.set("type",2);
		}else{
			params.set("page",this.page);
			params.set("limit",this.limit);
			params.set("uid",this.uid);
		}

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
					this.noData = true;
				}else{
					this.noData = false;
				}
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
        this.getUserCircle();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
        this.getUserCircle();
	}
	
}
