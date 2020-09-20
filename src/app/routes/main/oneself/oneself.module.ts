import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './OneSelf.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { OneSelfComponent } from './oneself.component';
import { VideoListComponent } from './cpt/videolist.component';
import { PlayListComponent } from './cpt/playlist.component';
import { PlayList2Component } from './cpt/playlist2.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		OneSelfComponent,
		VideoListComponent,
		PlayListComponent,
		PlayList2Component,
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class OneSelfListModule { }
