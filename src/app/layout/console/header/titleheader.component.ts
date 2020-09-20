import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'title-header',
    template: `
    <div class="topDiv">
        <div (click)="back()" class="topDiv-btnL"></div>
        {{title}}
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
}
