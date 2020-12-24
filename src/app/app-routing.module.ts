import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { ConsoleComponent } from './layout/console/console.component';
import { TitleBackComponent } from './layout/console/titleback.component';


const routes: Routes = [
	{
		path: 'main',
		component: ConsoleComponent,
		children: [
			{ path: '', redirectTo: 'choice', pathMatch: 'full' },
			// { path: 'choice', data: { id: 1 }, loadChildren: () => import('./routes/meetlist/meetlist.module').then(m => m.MeetListModule) },
			{ path: 'choice', loadChildren: () => import('./routes/main/choice/choice.module').then(m => m.ChoiceListModule) },
			{ path: 'attention', data: { type: "all" }, loadChildren: () => import('./routes/main/attention/attention.module').then(m => m.AttentionListModule)},
			{ path: 'oneself/:myuid', loadChildren: () => import('./routes/main/oneself/oneself.module').then(m => m.OneSelfListModule)},
			{ path: 'circle/:uid', loadChildren: () => import('./routes/main/circle/circle.module').then(m => m.CircleListModule)},
			// { path: 'name', data: { id: 2 }, loadChildren: () => import('./routes/meetlist/meetlist.module').then(m => m.MeetListModule) },
		]
	},
	{
		path: 'author',
		component: TitleBackComponent,
		data: { title: "作者主页" },
		children: [
			{
				path: 'main/:uid/:isAdmin',
				loadChildren: () => import('./routes/author/author.module').then(m => m.AuthorModule)
			}
		]
		
	},
	{
		path: 'myauthor',
		component: TitleBackComponent,
		data: { title: "管理圈子" },
		children: [
			{
				path: 'main',
				loadChildren: () => import('./routes/myauthor/myauthor.module').then(m => m.MyAuthorModule)
			}
		]
		
	},
	{
		path: 'usercenter',
		component: TitleBackComponent,
		data: { title: "个人中心" },
		children: [
			{
				path: 'main',
				loadChildren: () => import('./routes/usercenter/usercenter.module').then(m => m.UserCenterModule)
			}
		]
		
	},
	{ 
		path: 'mycircle',
		component: TitleBackComponent,
		data: { title: "圈友管理" },
		loadChildren: () => import('./routes/mycircle/mycircle.module').then(m => m.MyCircleModule)
	},
	{ 
		path: 'invitecode',
		component: TitleBackComponent,
		data: { title: "邀请码" },
		loadChildren: () => import('./routes/invitecode/invitecode.module').then(m => m.InviteCodeModule)
	},
	{ 
		path: 'myapply',
		component: TitleBackComponent,
		data: { title: "申请加入" },
		loadChildren: () => import('./routes/myapply/myapply.module').then(m => m.MyApplyModule)
	},
	{ 
		path: 'qa',
		component: TitleBackComponent,
		data: { title: "关于圈子" },
		loadChildren: () => import('./routes/qa/qa.module').then(m => m.QaModule)
	},
	{ 
		path: 'usercenter/circle',
		component: TitleBackComponent,
		pathMatch: 'prefix',
		data: { title: "什么是圈子" },
		loadChildren: () => import('./routes/usercenter/circle/circle.module').then(m => m.CircleModule)
	},
	{ 
		path: 'usercenter/createcircle',
		component: TitleBackComponent,
		pathMatch: 'prefix',
		data: { title: "如何建立圈子" },
		loadChildren: () => import('./routes/usercenter/createcircle/createcircle.module').then(m => m.CreateCircleModule)
	},
	{ 
		path: 'usercenter/addcircle',
		component: TitleBackComponent,
		data: { title: "如何邀请别人加入圈子" },
		loadChildren: () => import('./routes/usercenter/addcircle/addcircle.module').then(m => m.AddCircleModule)
	},
	{ 
		path: 'usercenter/gold',
		component: TitleBackComponent,
		data: { title: "如何赚金币" },
		loadChildren: () => import('./routes/usercenter/gold/gold.module').then(m => m.GoldModule)
	},
	{ 
		path: 'usercenter/shared',
		component: TitleBackComponent,
		data: { title: "如何分享" },
		loadChildren: () => import('./routes/usercenter/shared/shared.module').then(m => m.QaSharedModule)
	},

	{ path: 'oneself/introduction', loadChildren: () => import('./routes/main/oneself/introduction/introduction.module').then(m => m.IntroductionModule)},

	{ path: 'details/:id', loadChildren: () => import('./routes/details/details.module').then(m => m.DetailsModule) },
	
	{ path: 'shared/details/:id/:uid', loadChildren: () => import('./routes/shared/details/details.module').then(m => m.DetailsModule) },
	{ path: 'shared/invitecode/:code', loadChildren: () => import('./routes/shared/invitecode/invitecode.module').then(m => m.InviteCodeModule) },
	{ path: 'shared/download', loadChildren: () => import('./routes/shared/download/download.module').then(m => m.DownloadModule) },
	
	{ path: 'shared/invitereg/:code', loadChildren: () => import('./routes/shared/invitereg/invitereg.module').then(m => m.InviteRegModule) },
	
	{ path: 'shared/gold/:uid', loadChildren: () => import('./routes/shared/gold/gold.module').then(m => m.GoldModule) },
	{ path: 'shared/goldrules/:uid', loadChildren: () => import('./routes/shared/goldrules/goldrules.module').then(m => m.GoldRulesModule) },
	{ path: 'shared/signin/:uid', loadChildren: () => import('./routes/shared/signin/signin.module').then(m => m.SignInModule) },
	
	// { path: 'seatlist/name', loadChildren: () => import('./routes/seatlist/seatlist.module').then(m => m.SeatListModule) },
	// { path: 'seatbind/code', loadChildren: () => import('./routes/seatbind/seatbind.module').then(m => m.SeatBindModule) },
	// { path: 'seatbind/name', loadChildren: () => import('./routes/seatbind/seatbind.module').then(m => m.SeatBindModule) }
];

@NgModule({
	imports: [
		LayoutModule,
		RouterModule.forRoot(routes)
		// RouterModule.forRoot(routes,{ useHash: true })
	],

	exports: [RouterModule]
})
export class AppRoutingModule { }
