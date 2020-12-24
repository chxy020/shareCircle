import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoldRulesComponent } from './goldrules.component';


const routes: Routes = [
	{ path:'**',component:GoldRulesComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
