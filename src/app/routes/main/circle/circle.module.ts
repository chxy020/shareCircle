import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './circle.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CircleComponent } from './circle.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		CircleComponent,
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class CircleListModule { }
