import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadComponent } from './download.component';


const routes: Routes = [
	{ path:'**',component:DownloadComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
