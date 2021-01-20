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
	singInDays = 1;

	integral = 1;
	days = [];

	goldNum = 0;

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

		

		this.getPirceNum();

		this.getAttendanceList();
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
		if(i==0 && !this.todaySignIn){
			this.attendance();
		}
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

	getAttendanceList(){
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.userCode);
		params.set("page",1);
		params.set("limit",1);

		let url = "/jqkj/pirce/getAttendanceList";
		this.http.get(url, params, null).subscribe(data => {
			if(data.code == 0){
				// this.goldNum = data.data || 0;
				var list = data.data || [];
				var item = list[0] || {};

				// item.continuous_num  = 0
				var created_at = item.created_at || 0;
				if(created_at){
					var st = new Date(+created_at);
					var y = st.getFullYear();
					var m = st.getMonth();
					var d = st.getDate();
					var stt = new Date(y,m,d).getTime();
					var now = new Date();
					var ntt = new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();

					var stime = ntt - stt;
					if(stime > (24 * 60 * 60 * 1000)){
						this.todaySignIn = false;
					}else{
						this.todaySignIn = true;
					}
				}

				this.singInDays = (+item.continuous_num || 0);
				var num = (+item.continuous_num || 0) + 1;
				if(this.todaySignIn == true){
					num--;
				}

				this.integral = num > 7 ? 7 : num;

				this.countDays();
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

	attendance(){
		this.loading = true;
		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.userCode);

		let url = "/jqkj/pirce/attendance";
		this.http.post(url, params, null).subscribe(data => {
			if(data.status == 0){
				this.todaySignIn = true;
				this.singInDays++;
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
	
}
