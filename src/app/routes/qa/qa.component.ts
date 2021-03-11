import { Component, OnInit, ViewChild, ElementRef, Injector, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'qa',
	templateUrl: './qa.component.html'
})

export class QaComponent implements OnInit {
	
	loading = false;
	showTip = false;
	showMsg = "";
	
	baseUrl = "";
	uid;

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];
	}

	vdetail(){
		var aa =  "url=http://dev-storage.jinquntech.com/d?e=3&token=wt:x-Y=&name=aa.mp4&source=app&uid=5";
		location.href = "http://localhost:4100/shared/vdetails?" + encodeURIComponent(aa);
	}

	ngOnInit() {
	}

	me1:any;
	me2:any;
	drapUp(me:any){
		console.log("drapUp-----");
		// this.me1 = me;
		// this.me1.resetload();
		// this.me1.unlock();
		// this.me1.noData(false);

		// this.page1 = 1;
		// this.data1 = [];
		// this.getAddCircleNo();
    }
    drapDown(me:any){
		console.log("drapDown------------");
		// this.me1 = me;
		// this.page1++;
		// this.getAddCircleNo();
	}
	
}
