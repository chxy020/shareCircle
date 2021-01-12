import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'signin',
	templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {

	loading = true;
	errorMsg;
	showTip = false;

	userCode;

	todaySignIn = false;
	signInDays = 1;

	integral = 1;
	days = [];

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private router: Router
	) {
		// 用户首次签到获得1个金币，7日内连续签到，金币奖励每日递增1个金币；
		// 连续签满7日之后保持每日签到，每次可获取7个金币。
	}

	ngOnInit() {
		this.userCode = this.route.snapshot.paramMap.get('uid') || "";

		this.countDays();
	}

	gotoGold(){
		this.router.navigate(['/shared/gold/',this.userCode,1]);
	}


	countDays(){
		let now = new Date();

		for(let i = 0; i < 7; i++){
			if(i==0){
				this.days.push({name:"今天",num:this.integral});
			}else if(i==1){
				this.days.push({name:"明天",num:(this.integral+1) > 7 ? 7:(this.integral+1)});
			}else{
				let date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
				let m:any = date.getMonth() + 1;
				m = m < 10 ? "0"+m : m;
				let d:any = date.getDate();
				d = d < 10 ? "0"+d : d;
				this.days.push({name:m+"."+d,num:(this.integral+i) > 7 ? 7:(this.integral+i)});
			}
		}

		console.log(this.days)
	}

	signDay(i){
		if(i==0){
			this.todaySignIn = true;
		}
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
