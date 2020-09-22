import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './myauthor.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyAuthorComponent } from './myauthor.component';
import { VideoListComponent } from './cpts/videolist.component';
import { PlayListComponent } from './cpts/playlist.component';
import { BasicInfoComponent } from './cpts/basicinfo.component';
import { ApplyListComponent } from './cpts/applylist.component';
import { PlayList2Component } from './cpts/playlist2.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		MyAuthorComponent,
		BasicInfoComponent,
		PlayListComponent,
		PlayList2Component,
		VideoListComponent,
		ApplyListComponent,
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class MyAuthorModule { }
