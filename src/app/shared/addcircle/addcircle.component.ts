import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http/http.service';

@Component({
	selector: 'addcircle',
	templateUrl: './addcircle.html'
})
export class AddCircleComponent implements OnInit, OnDestroy {
	@Input() public popShow:boolean = false;
	@Input() public addUid:string;
	@Output() public close = new EventEmitter<any>();
	@Output() public addSuccess = new EventEmitter<any>();
	
	showTip;
	showMsg = "";
	loading;
	num;

	isSuccess = false;

	baseUrl = "";
	uid;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpService
	) {
		this.baseUrl = window["context"]["apiroot"];
		this.uid = window['context']['uid'];
	}

	ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
		// let options = changes['isshow'].currentValue || '';
		// console.log("-----",options)
		// if (options !== '') {
		//   // this.options = options;
		//   // console.log(this.options);
		// }
	}

	ngOnInit() {

	}

	ngOnDestroy() {
	}

	closePop(){
		this.popShow = false;

		this.close.emit();
	}

	addBtn(){
		this.addCircle();
	}

	goQa(){
		this.router.navigate(['/qa']);
	}

	succesBtn(){
		this.isSuccess = false;
	}
	addCircle():void{
		if(!this.num){
			this.showMsg = "请输入圈子专属码";
			this.showTip = true;
			setTimeout(() =>{
				this.showTip = false;
			},2500);
			return;
		}

		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		params.set("addUid",this.addUid);
		// params.set("circleId",this.circleId);
		params.set("num",this.num);

		let url = "/jqkj/circleMine/addCircle";
		this.http.post(url, params, null).subscribe(data => {
			if(data.status == 0){
				// this.detail = data.data || {};
				this.popShow = false;
				this.isSuccess = true;

				this.addSuccess.emit();
			}else{
				this.showMsg = data.msg;
				this.showTip = true;
				setTimeout(() =>{
					this.showTip = false;
				},2500);
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}

	getWidth(el: any): number {
		let styles = window.getComputedStyle(el);
		let width = el.offsetWidth;
		let borderLeftWidth = parseFloat(styles.borderLeftWidth);
		let borderRightWidth = parseFloat(styles.borderRightWidth);
		let paddingLeft = parseFloat(styles.paddingLeft);
		let paddingRight = parseFloat(styles.paddingRight);
		return width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight;
	}

	getHeight(el: any): number {
		let styles = window.getComputedStyle(el);
		let height = el.offsetHeight;
		let borderTopWidth = parseFloat(styles.borderTopWidth);
		let borderBottomWidth = parseFloat(styles.borderBottomWidth);
		let paddingTop = parseFloat(styles.paddingTop);
		let paddingBottom = parseFloat(styles.paddingBottom);
		return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
	}
}
