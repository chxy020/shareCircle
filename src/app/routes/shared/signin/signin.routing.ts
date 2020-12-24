import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './signin.component';


const routes: Routes = [
	{ path:'**',component:SignInComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
