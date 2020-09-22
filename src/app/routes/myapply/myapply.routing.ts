import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyApplyComponent } from './myapply.component';


const routes: Routes = [
	{ path:'**',component:MyApplyComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
