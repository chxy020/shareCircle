import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCircleComponent } from './createcircle.component';


const routes: Routes = [
	{ path:'**',component:CreateCircleComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
