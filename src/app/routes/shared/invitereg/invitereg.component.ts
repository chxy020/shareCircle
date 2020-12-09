import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'invitereg',
	templateUrl: './invitereg.component.html'
})

export class InviteRegComponent implements OnInit {

	loading = true;
	errorMsg;
	showTip = false;

	userCode;

	phone;
	phoneCode;

	codeBtn = 1;
	countTime = 60;

	regModel = 0;

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private router: Router
	) {
	}

	ngOnInit() {
		this.userCode = this.route.snapshot.paramMap.get('code');

		console.log(this.userCode)
	}

	getPhoneCode(){
		if(!this.phone){
			this.errorMsg = "请输入手机号";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}
		if(!this.isTel(this.phone)){
			this.errorMsg = "手机号输入错误";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}

		this.codeBtn = 0;
		this.msgCodeTime();

		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("id",this.phone);

		let url = "/jqkj/cricle/findUserPublish";
		this.http.get(url, params, null).subscribe(data => {
			// console.log(data)
			// if(data.status == 0){
			// 	this.detail = data.data || {};
			// }
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	msgCodeTime(){
		if(this.countTime > 0){
			this.countTime--;
			setTimeout(function(){
				this.msgCodeTime();
			}.bind(this),1000);
		}else{
			this.countTime = 60;
			this.codeBtn = 1;
		}
	}

	isTel(val){
		var reg = /^1[3|4|5|6|7|8]\d{9}$/;
		var b = false;
		if(val !== ""){
			b = reg.test(val);
		}
		return b;
	}

	enterBtn(){
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("id",this.phone);
		params.set("id",this.phoneCode);
		params.set("id",this.userCode);

		let url = "/jqkj/cricle/findUserPublish";
		this.http.get(url, params, null).subscribe(data => {
			// console.log(data)
			// if(data.status == 0){
			// 	this.detail = data.data || {};
			// }
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}
}
