import { Component, OnInit, ViewChild, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
	selector: 'myauthor-basic-info',
	templateUrl: './basicinfo.component.html'
})

export class BasicInfoComponent implements OnInit {
	@Input() circleName:string;
	@Input() friendNum:string;
	@Input() appleNum:string;
	@Output() public drapUpEvent = new EventEmitter<any>();


	data = [];
	loading = true;
	me:any;

	page = 0;
	limit = 10;

	headImg = "./assets/images/default-touxiang.png";
	videoImg = "./assets/images/default-img.png";

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

	ngOnInit() {
		// this.getAddCircleNum();
	}

	meetClick(item):void{
        // if(this.id==1){
        //     this.router.navigate(['/seatlist/code',{id:this.id,meetid:item.id}]);
        // }else{
        //     this.router.navigate(['/seatlist/name',{id:this.id,meetid:item.id}]);
        // }
	}

	myCircleBtn():void{
		this.clickFriend();

		this.router.navigate(['/mycircle']);
	}
	myApplyBtn():void{
		this.router.navigate(['/myapply']);
	}
	
	clickFriend():void{
		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		
		let url = "/jqkj/circleMine/clickFriend";
		this.http.post(url, params, null).subscribe(data => {
		}, error => {
			console.error(error);
		});
	}

	getAddCircleNum():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);
		
		let url = "/jqkj/circleMine/getAddCircleNum";
		this.http.get(url, params, null).subscribe(data => {
			console.log("getAddCircleNum---",data)
			if(data.code == 0){
				
			}

			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
	}


	drapUp(me:any){
        console.log("drapUp-----");
        this.me = me;
        this.me.resetload();
        this.me.unlock();
		this.me.noData(false);
		
		this.drapUpEvent.emit();
        // this.getAddCircleNum();
    }
    drapDown(me:any){
        console.log("drapDown------------");
        this.me = me;
        
	}
	
}
