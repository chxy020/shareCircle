import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';


const routes: Routes = [
	{ path:'**',component:DetailsComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
