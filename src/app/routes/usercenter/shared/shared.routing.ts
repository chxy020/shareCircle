import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QaSharedComponent } from './shared.component';


const routes: Routes = [
	{ path:'**',component:QaSharedComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
