import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCenterComponent } from './usercenter.component';


const routes: Routes = [
	{ path:'**',component:UserCenterComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
