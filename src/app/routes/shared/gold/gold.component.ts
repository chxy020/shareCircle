import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
import { Location } from '@angular/common';

@Component({
	selector: 'gold',
	templateUrl: './gold.component.html'
})

export class GoldComponent implements OnInit {

	loading = true;
	errorMsg;
	showTip = false;

	userCode;
	backType;

	data = [];
	me:any;

	page = 0;
	limit = 10;

	goldNum = 0;

	typeText = ["注册","签到","分享文件","推荐其他用户进行注册","推荐用户平台消费","新圈主奖励","发布圈子分享","加精奖励"];
	
	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private location: Location,
		private router: Router
	) {
	}

	ngOnInit() {
		this.userCode = this.route.snapshot.paramMap.get('uid') || "";
		this.backType = this.route.snapshot.paramMap.get('type') || 1;
		// console.log(this.userCode,this.backType)

		this.getPirceNum();
	}

	back(){
        if(this.backType == 2){
            this.closeWebView();
        }else{
            this.location.back();
        }
    }
    
    closeWebView(){
		let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

		if (isAndroid) {
            //这个是安卓操作系统
            // alert("android");
            // alert(window["circle"]);
            if(typeof window["circle"] != "undefined"){
                // alert(window["circle"].publishCircle)
                try{
                    window["circle"].closeWebview();
                }catch(ex){
                    alert("closeWebview catch")
                }
            }else{
                alert("circle不存在");
            }
        }
        if (isIOS) {
            //这个是ios操作系统
            // alert("ios");
            // if(typeof webkit != "undefined"){
            //     if(typeof webkit.messageHandlers != "undefined"){
            //         if(typeof webkit.messageHandlers.showDetail != "undefined"){
            //             var msg = webkit.messageHandlers.showDetail.postMessage("{'test':'123'}");
            //             document.getElementById("native").innerHTML = "native响应：" + msg;
            //         }else{
            //             alert("window.webkit.messageHandlers.showDetail不存在");
            //         }
            //     }else{
            //         alert("window.webkit.messageHandlers不存在");
            //     }
            // }else{
            //     alert("window.webkit不存在");
            // }
        }
	}
	
	goldRules(){
		this.router.navigate(['/shared/goldrules/',this.userCode]);
	}


	getPirceNum(){
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.userCode);

		let url = "/jqkj/pirce/getPirceNum";
		this.http.post(url, params, null).subscribe(data => {
			if(data.status == 0){
				this.goldNum = data.data || 0;
			}else{
				this.errorMsg = data.msg;
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

	getPirceEvents():void{
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		

		let url = "/jqkj/pirce/getPirceEvents";
		params.set("uid",this.userCode);
		params.set("page",this.page);
		params.set("limit",this.limit);

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

	drapUp(me:any){
        console.log("drapUp-----");
        this.me = me;
        this.me.resetload();
        this.me.unlock();
		this.me.noData(false);
		
        this.page = 1;
        this.data = [];
        // this.getSelectedCircle();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        this.page++;
		this.getPirceEvents();
		
		
		// this.me.lock();
		// // 无数据
		// this.me.noData(true);
		
		// setTimeout(()=>{
		// 	this.me.resetload();
		// },200);
	}






}
