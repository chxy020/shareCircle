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
			{ path: 'oneself', loadChildren: () => import('./routes/main/oneself/oneself.module').then(m => m.OneSelfListModule)},
			// { path: 'name', data: { id: 2 }, loadChildren: () => import('./routes/meetlist/meetlist.module').then(m => m.MeetListModule) },
		]
	},
	{
		path: 'author',
		component: TitleBackComponent,
		data: { title: "作者主页" },
		children: [
			{
				path: 'main/:uid',
				loadChildren: () => import('./routes/author/author.module').then(m => m.AuthorModule)
			}
		]
		
	},
	{
		path: 'myauthor',
		component: TitleBackComponent,
		data: { title: "我的主页" },
		children: [
			{
				path: 'main',
				loadChildren: () => import('./routes/myauthor/myauthor.module').then(m => m.MyAuthorModule)
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
		path: 'myapply',
		component: TitleBackComponent,
		data: { title: "申请加入" },
		loadChildren: () => import('./routes/myapply/myapply.module').then(m => m.MyApplyModule)
	},
	{ path: 'details/:id', loadChildren: () => import('./routes/details/details.module').then(m => m.DetailsModule) },
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
