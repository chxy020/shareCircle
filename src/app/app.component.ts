import { LowerCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'shareCircle';
	constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { 
		// let href = location.href;
		// if(href.indexOf("uid") == -1){
		// 	alert("没有获取到uid参数");
		// 	return;
		// }
		this.route.queryParams.subscribe(params => {
			let uid = params["uid"];
			if(uid){
				window["context"]["uid"] = uid;
				window.sessionStorage.setItem("__uid",uid);
			}else{
				uid = window.sessionStorage.getItem("__uid") || "";
				if(uid){
					window["context"]["uid"] = uid;
				}else{
					// alert("没有获取到用户uid");
					// this.router.navigate(['/main']);
				}
			}
		});
	}
	
	ngOnInit() {
		// 获取参数， 使用 queryParams
		// let param1 = this.route.snapshot.queryParams["uid"];
		// console.log("1---",param1);
	
		// this.route.queryParams.subscribe(params => {
		// 	console.log("2---",params["uid"]);
		// });
	
		// // 获取参数， 使用 queryParamMap
		// this.route.queryParamMap.subscribe(data => {
		// 	const params = data['params'];
		// 	console.log("3---",params);
		// 	// this.name = params['name'];
		// 	// this.type = params['type'];
		// });
	
	  }
}
