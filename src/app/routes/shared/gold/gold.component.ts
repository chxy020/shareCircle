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
		console.log(this.userCode,this.backType)
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
		// this.getSelectedCircle();
		
		
		this.me.lock();
		// 无数据
		this.me.noData(true);
		
		setTimeout(()=>{
			this.me.resetload();
		},200);
	}






	// getPhoneCode(){
	// 	if(!this.phone){
	// 		this.errorMsg = "请输入手机号";
	// 		this.showTip = true;
	// 		setTimeout(() =>{
	// 			this.showTip = false;
	// 		},2500);
	// 		return;
	// 	}
	// 	if(!this.isTel(this.phone)){
	// 		this.errorMsg = "手机号输入错误";
	// 		this.showTip = true;
	// 		setTimeout(() =>{
	// 			this.showTip = false;
	// 		},2500);
	// 		return;
	// 	}

	// 	this.codeBtn = 0;
	// 	this.msgCodeTime();

	// 	this.loading = true;
	// 	const params: Map<string, any> = new Map<string, any>();
	// 	params.set("phone",this.phone);

	// 	let url = "/jqkj/user/sendsms";
	// 	this.http.post(url, params, null).subscribe(data => {
	// 		// console.log(data)
	// 		if(data.status == 1){
	// 			this.errorMsg = "验证码已发送";
	// 			this.showTip = true;
	// 			setTimeout(() =>{
	// 				this.showTip = false;
	// 			},2500);
	// 		}else{
	// 			this.errorMsg = data.msg;
	// 			this.showTip = true;
	// 			setTimeout(() =>{
	// 				this.showTip = false;
	// 			},2500);
	// 		}
	// 		this.loading = false;
	// 	}, error => {
	// 		console.error(error);
	// 		this.loading = false;
	// 	});
	// }

	// msgCodeTime(){
	// 	if(this.countTime > 0){
	// 		this.countTime--;
	// 		setTimeout(function(){
	// 			this.msgCodeTime();
	// 		}.bind(this),1000);
	// 	}else{
	// 		this.countTime = 60;
	// 		this.codeBtn = 1;
	// 	}
	// }

	// isTel(val){
	// 	var reg = /^1[3|4|5|6|7|8]\d{9}$/;
	// 	var b = false;
	// 	if(val !== ""){
	// 		b = reg.test(val);
	// 	}
	// 	return b;
	// }

	// downloadApp(){
	// 	this.router.navigate(['/shared/download']);
	// }

	// enterBtn(){
	// 	this.loading = true;
	// 	const params: Map<string, any> = new Map<string, any>();
	// 	params.set("phone",this.phone);
	// 	params.set("code",this.phoneCode);
	// 	params.set("invite_uid",this.userCode);

	// 	let url = "/jqkj/extend/inviteRegister";
	// 	this.http.post(url, params, null).subscribe(data => {
	// 		if(data.status == 0){
	// 			this.registerStatus = 1;
	// 			this.regModel = 0;

	// 			this.errorMsg = "注册成功";
	// 			this.showTip = true;
	// 			setTimeout(() =>{
	// 				this.showTip = false;
	// 			},2500);
	// 		}else{
	// 			this.errorMsg = data.msg;
	// 			this.showTip = true;
	// 			setTimeout(() =>{
	// 				this.showTip = false;
	// 			},2500);
	// 		}
	// 		this.loading = false;
	// 	}, error => {
	// 		console.error(error);
	// 		this.loading = false;
	// 	});
	// }
}
