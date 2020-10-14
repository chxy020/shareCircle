import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SubjectService } from 'src/app/shared/services/subjectService.service';
declare var circle:any;

@Component({
    selector: 'title-header',
    template: `
    <div class="topDiv">
        <div (click)="back()" class="topDiv-btnL"></div>
        {{title}}

        <div (click)="menuBtn($event,menuele)" *ngIf="title=='我的主页' || title=='作者主页'" class="topDiv-btnR"></div>
        <div #menuele style="display:none;" class="tip_operlist">
            <ul *ngIf="title=='我的主页'" >
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
    
    title;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private sub:SubjectService,
        private router: Router
    ) { 
        
    }

    ngOnInit() {
        this.route.data.subscribe(params => {
			this.title = params["title"] || "";
		});
    }

    back(){
		this.location.back();
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

		clearTimeout(this.eleOut);
		this.eleOut = setTimeout(()=>{
			ele.style.display = "none";
		},3000);
    }
    
    shareCode(){
        this.router.navigate(['/invitecode']);
    }

    choiceShare(){
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            //这个是安卓操作系统
            // alert("android");
            if(typeof circle != "undefined"){
                circle.choiceJoinOrShareCircle();
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
