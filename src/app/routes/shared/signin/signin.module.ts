import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './signin.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignInComponent } from './signin.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		SignInComponent
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class SignInModule { }
