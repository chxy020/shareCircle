import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteRegComponent } from './invitereg.component';


const routes: Routes = [
	{ path:'**',component:InviteRegComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
