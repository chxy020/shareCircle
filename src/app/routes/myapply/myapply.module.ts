import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './myapply.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CircleDataFilterPipe, MyApplyComponent } from './myapply.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		CircleDataFilterPipe,
		MyApplyComponent
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class MyApplyModule { }
