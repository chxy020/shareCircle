import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCircleComponent } from './mycircle.component';


const routes: Routes = [
	{ path:'**',component:MyCircleComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
