import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import './api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './shared/services/http';
import { SharedModule } from './shared/shared.module';
import { SubjectService } from './shared/services/subjectService.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		SharedModule,
		AppRoutingModule
	],
	providers: [
		HttpClient,
		SubjectService,
		HttpService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
