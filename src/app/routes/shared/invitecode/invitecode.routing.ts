import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteCodeComponent } from './invitecode.component';


const routes: Routes = [
	{ path:'**',component:InviteCodeComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
