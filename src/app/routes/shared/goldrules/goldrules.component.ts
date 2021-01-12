import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';
import { Location } from '@angular/common';

@Component({
	selector: 'goldrules',
	templateUrl: './goldrules.component.html'
})

export class GoldRulesComponent implements OnInit {

	loading = true;
	errorMsg;
	showTip = false;

	userCode;
	backType;

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
                // var msg = circle.choiceJoinOrShareCircle();
                // var msg = H5JsStorage.showDetail("{'test':'123'}");
                // document.getElementById("native").innerHTML = "native响应：" + msg;
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
}
