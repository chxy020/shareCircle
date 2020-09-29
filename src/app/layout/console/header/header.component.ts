import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http';

@Component({
    selector: 'header-console',
    template: `
    <div class="searchTop">
        <div class="inputDiv">
            <input type="text" placeholder="搜索资源 " readonly onclick="window.location.href='#'">
            <img src="./assets/images/searchTop.png" alt="">
        </div>
        <div (click)="myAuthorClick();" class="rightBtn">
            <img src="./assets/images/icon1.png" alt="">
        </div>
    </div>
    <div class="tabDiv">
        <ul class="tabDiv-box">
            <li (click)="menuClick(item);" *ngFor="let item of menus;let i = index;" [class.tabDivActive]="item.current" >{{item.name}}</li>
        </ul>
    </div>
    `,
    styles: [``]
})


export class HeaderConsoleComponent implements OnInit {
    loading = true;

	headImg = "./assets/images/headimg.png";

	pageType = 1;

	baseUrl = "";
	uid;

    routeUrl;

    // <li class="tabDivActive">精选</li>
    menus:Array<any> = [
        {id:1,name:"精选",current:false},
        {id:2,name:"关注",current:false},
        {id:3,name:"我的圈子",current:false}
    ];

    constructor(
        private route: ActivatedRoute,
        private http: HttpService,
        private router: Router
    ) { 
        
        // console.log(this.router.url);

        this.menus.map((item)=>item.current=false);

        this.currentPage();

        // this.route.params.pipe(map).map(params => {
        //     return params['id'];
        // }).subscribe(id => {
        //     this.loadDB(id);
        // });

        // this.heroService.getHero(id)
        //   .subscribe(hero => this.hero = hero);
    }

    currentPage(){
        let url = this.router.url;
        if(url.indexOf("/main/choice") > -1){
            this.menus[0].current = true;
        }
        if(url.indexOf("/main/attention") > -1){
            this.menus[1].current = true;
        }
        if(url.indexOf("/main/oneself") > -1){
            this.menus[2].current = true;
        }
    }

    ngOnInit() {
        this.uid = window["context"]["uid"];
        this.routeUrl = this.router.url.toString();

        this.getMineNavigation();

        // let url = this.router.url;
        // if(url == '/meetlist/name'){
        //     this.id = 2;
        // }else{
        //     this.id = 1;
        // }
    }

    menuClick(item):void{
        this.menus.map((item)=>item.current=false);

        switch(item.id){
            case 1:
                this.menus[0].current = true;
                this.router.navigate(['/main/choice'],{queryParams:{uid:this.uid}});
            break;
            case 2:
                this.menus[1].current = true;
                this.router.navigate(['/main/attention/all']);
            break;
            case 3:
                this.menus[2].current = true;
                this.router.navigate(['/main/oneself']);
            break;
        }
        if(item.uid){
            item.current = true;
            this.router.navigate(['/main/circle/'+item.uid]);
        }
    }

    myAuthorClick(){
        this.router.navigate(['/myauthor/main']);
    }

    getMineNavigation():void{
		this.loading = true;

		const params: Map<string, any> = new Map<string, any>();
		params.set("uid",this.uid);

		let url = "/jqkj/circleMine/getMineNavigation";
		this.http.get(url, params, null).subscribe(data => {
			if(data.status == 0){
                this.menus.map((item)=>item.current=false);
                let list = data.data || [];
                list.forEach(item=>{
                    this.menus.push({
                        "uid":item.uid,
                        "name":item.circleName,
                        "current":this.routeUrl.indexOf('circle/'+item.uid) > -1 ? true : false
                    });
                });

                this.currentPage();
				// this.menus = this.menus.concat(list);
			}
			this.loading = false;
		}, error => {
			console.error(error);
			this.loading = false;
		});
    }
    
    getLicense(): void {
      // this.http.post('/platform/authz/getList', null , this.ctx).subscribe(data => {
      //   if (data.code === 200) {
      //     this.license = data.data.licenseInfo;
      //   }
      // });
    }
}
