import { Component, OnInit, ViewChild, ElementRef, Injector, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';


@Component({
	selector: 'invitecode',
	templateUrl: './invitecode.component.html'
})

export class InviteCodeComponent implements OnInit {
	loading = true;
	

	headImg = "./assets/images/default-touxiang.png";
	videoImg = "./assets/images/default-img.png";

	baseUrl = "";
	uid;

	sharedCode = "";

	constructor(
		private route: ActivatedRoute,
		private http: HttpService,
		private router: Router
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];
	}

	ngOnInit() {
		// this.id = +this.route.snapshot.data.id;
		// this.title = this.titles[this.id];
		// this.uid = this.route.snapshot.paramMap.get('uid');
		// this.getCircleMine();

		let code = window.sessionStorage.getItem("__sharedcode") || "";
		if(code){
			this.sharedCode = code;
		}else{
			this.sharedCode = "";
		}
	}

	
}
