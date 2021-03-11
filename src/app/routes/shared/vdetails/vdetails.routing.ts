import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VDetailsComponent } from './vdetails.component';


const routes: Routes = [
	{ path:'**',component:VDetailsComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
