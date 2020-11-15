import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroductionComponent } from './introduction.component';


const routes: Routes = [
	{  path:'**',component:IntroductionComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
