import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAuthorComponent } from './myauthor.component';


const routes: Routes = [
	{ path:'**',component:MyAuthorComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
