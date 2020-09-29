import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './author.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorComponent } from './author.component';
import { NowListComponent } from './cpts/friendnow.component';
import { CommentListComponent } from './cpts/comment.component';
import { ShareListComponent } from './cpts/share.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	
	declarations: [
		AuthorComponent,
		NowListComponent,
		CommentListComponent,
		ShareListComponent,
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class AuthorModule { }
