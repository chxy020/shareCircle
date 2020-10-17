import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'download-app',
	templateUrl: './download.component.html'
})

export class DownloadComponent implements OnInit {
	sharedCode;

	downloadUrl;
	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {
		this.downloadUrl =  window["context"]["downloadUrl"];

		if(!this.isWeiXin()){
			window.location.href = this.downloadUrl;
		}
	}

	ngOnInit() {
		// this.sharedCode = this.route.snapshot.paramMap.get('code');
		//如果在微信端，显示提示，如果不是微信，直接跳转下载链接
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
