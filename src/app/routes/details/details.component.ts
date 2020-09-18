import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
import { Location } from '@angular/common';

@Component({
	selector: 'video-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
	
	headImg = "./assets/images/headimg.png";
	videoImg = "./assets/images/listimg.jpg";

	detail:any = {};
	loading = true;

	uid;
	baseUrl;
	id;

	tabType = 1;
	commentMsg = "";

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private location: Location,
		private router: Router
	) {
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];

		this.uid = window['context']['uid'];
		this.baseUrl = window["context"]["apiroot"];
		this.id = +this.route.snapshot.paramMap.get('id');


		this.findUserPublish();
	}

	// meetClick(item):void{
    //     if(this.id==1){
    //         this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
    //     }else{
    //         this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
    //     }
	// }

	back(){
		this.location.back();
	}
	
	changeTabType(t){
		this.tabType = +t;
	}

	findUserPublish():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("id",this.id);
		params.set("uid",this.uid);

		let url = "/jqkj/cricle/findUserPublish";
		this.http.get(url, params, null).subscribe(data => {
			// console.log(data)
			if(data.status == 0){
				this.detail = data.data || {};

				// this.getFirstComment();
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	addComment(){
		if(!this.commentMsg){
			alert("请输入评论信息");
			return;
		}
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("messages",this.commentMsg);
		params.set("uid",this.uid);
		params.set("circleId",this.detail.id);

		let url = "/jqkj/cricle/comment";
		this.http.post(url, params, null).subscribe(data => {
			// console.log(data)
			if(data.status == 0){
				alert("评论成功");

				this.detail.comment_num++;
				this.commentMsg = "";
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	addGive(){
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		params.set("circleId",this.detail.id);

		let url = "/jqkj/cricle/give";
		this.http.post(url, params, null).subscribe(data => {
			// console.log(data)
			// 0 成功 -1 失败 -2 已经点过赞了
			if(data.status == 0){
				alert("点赞成功");
				this.detail.give_num++;
			}else if(data.status ==  -1){
				alert("点赞失败");
			}else if(data.status ==  -2){
				alert("已经点过赞了");
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	
}
