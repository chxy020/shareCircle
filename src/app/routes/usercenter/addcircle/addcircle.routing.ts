import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCircleComponent } from './addcircle.component';


const routes: Routes = [
	{ path:'**',component:AddCircleComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
