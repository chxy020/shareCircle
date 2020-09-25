import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'title-header',
    template: `
    <div class="topDiv">
        <div (click)="back()" class="topDiv-btnL"></div>
        {{title}}

        <div (click)="menuBtn($event,menuele)" *ngIf="title=='我的主页'" class="topDiv-btnR"></div>
        <div #menuele style="display:none;" class="tip_operlist">
            <ul>
                <li (click)="shareCode()" >分享邀请码</li>
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
}
