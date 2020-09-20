import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './author.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorComponent } from './author.component';
import { VideoListComponent } from './cpts/videolist.component';
import { PlayListComponent } from './cpts/playlist.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		AuthorComponent,
		VideoListComponent,
		PlayListComponent,
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class AuthorModule { }
