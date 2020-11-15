import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { IntroductionComponent } from './introduction.component';
import { PageRoutes } from './introduction.routing';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		IntroductionComponent,
	]
})
export class IntroductionModule { }
