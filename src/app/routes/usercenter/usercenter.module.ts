import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './usercenter.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserCenterComponent } from './usercenter.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		UserCenterComponent,
	]
})
export class UserCenterModule { }
