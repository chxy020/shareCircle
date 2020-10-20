import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'download-app',
	templateUrl: './download.component.html'
})

export class DownloadComponent implements OnInit {
	loading = false;
	downloadUrl;
	baseUrl;
	isWx = false;
	constructor(
		private http: HttpService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.downloadUrl =  window["context"]["downloadUrl"];
		this.baseUrl = window["context"]["apiroot"];
		if(!this.isWeiXin()){
			this.isWx = false;
			this.getApkUrl();
			// window.location.href = this.downloadUrl;
		}else{
			this.isWx = true;
		}
	}

	ngOnInit() {
		// this.sharedCode = this.route.snapshot.paramMap.get('code');
		//如果在微信端，显示提示，如果不是微信，直接跳转下载链接
	}

	getApkUrl():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("type",0);

		let url = "/jqkj/user/appNow";
		this.http.get(url, params, null).subscribe(data => {
			// console.log(data)
			if(data.status == 0){
				let obj = data.data || {};
				window.location.href = this.baseUrl + obj.path;
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	//判断是否为微信浏览器
	isWeiXin(){
		let ua = window.navigator.userAgent.toLowerCase();
		if(ua.indexOf('micromessenger') != -1){
			return true;
		}else{
			return false;
		}
	}
}
