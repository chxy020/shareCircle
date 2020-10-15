import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QaComponent } from './qa.component';


const routes: Routes = [
	{ path:'**',component:QaComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
