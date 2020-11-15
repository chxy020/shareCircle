import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CircleComponent } from './circle.component';


const routes: Routes = [
	{ path:'**',component:CircleComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
