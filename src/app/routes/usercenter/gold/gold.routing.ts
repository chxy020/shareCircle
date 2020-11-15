import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoldComponent } from './gold.component';


const routes: Routes = [
	{ path:'**',component:GoldComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
