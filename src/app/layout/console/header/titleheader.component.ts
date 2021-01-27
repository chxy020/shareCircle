import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SubjectService } from 'src/app/shared/services/subjectService.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'title-header',
    template: `
    <div class="topDiv">
        <div (click)="back()" class="topDiv-btnL"></div>
        {{title}}

        <div (click)="menuBtn($event,menuele)" *ngIf="(title=='管理圈子' || title=='作者主页') && isShow" class="topDiv-btnR"></div>
        <div #menuele (click)="menuele.style.display='none'" style="display:none;" class="tip_operlist">
            <ul *ngIf="title=='管理圈子'" >
                <li (click)="shareCode()" >分享邀请码</li>
            </ul>
            <ul *ngIf="title=='作者主页'" >
                <li (click)="choiceShare()" >发布分享</li>
                <li (click)="quitCircle()" >退出圈子</li>
            </ul>
        </div>
    </div>
    `,
    styles: [``]
})


export class TitleHeaderComponent implements OnInit {
    
    isShow = 1;
    title;
    //是否本地跳转，本地跳转，关闭webview
    n = 0;

    mainTitleSub:Subscription;

    ngOnDestroy(): void {
        if (this.mainTitleSub) {
            this.mainTitleSub.unsubscribe();
        }
    }
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private sub:SubjectService,
        private router: Router
    ) { 
        this.mainTitleSub = this.sub.mainTitleObservable.subscribe(
            () =>{
				this.isShow = 0;
			}
		);
    }

    ngOnInit() {
        this.route.data.subscribe(params => {
			this.title = params["title"] || "";
        });
        
        this.route.queryParams.subscribe(params => {
			this.n = params["n"];
        });
    }

    back(){
        if(this.n){
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
    
    currentItem;
	currentMenuEle;
	eleOut;
	menuBtn(evt:MouseEvent,ele:any){
		evt.preventDefault();
		evt.stopPropagation();
		
		if(this.currentMenuEle){
			this.currentMenuEle.style.display = "none";
		}

		this.currentMenuEle = ele;
		ele.style.display = "block";

		// clearTimeout(this.eleOut);
		// this.eleOut = setTimeout(()=>{
		// 	ele.style.display = "none";
		// },3000);
    }
    
    shareCode(){
        this.router.navigate(['/invitecode']);
    }

    choiceShare(){
        // alert("choiceShare");
        // alert(navigator.userAgent);
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
                    window["circle"].publishCircle();
                }catch(ex){
                    alert("publishCircle catch")
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

    quitCircle(){
        this.sub.quitCircleSub();
    }
}
