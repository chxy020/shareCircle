import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './goldrules.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoldRulesComponent } from './goldrules.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		GoldRulesComponent
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class GoldRulesModule { }
