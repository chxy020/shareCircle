import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './vdetails.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { VDetailsComponent } from './vdetails.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		VDetailsComponent
	]
})
export class VDetailsModule { }
