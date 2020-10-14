import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './download.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DownloadComponent } from './download.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		DownloadComponent
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class DownloadModule { }
