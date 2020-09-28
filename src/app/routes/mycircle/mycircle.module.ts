import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './mycircle.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyCircleComponent } from './mycircle.component';
import { CommentListComponent } from './cpts/comment.component';
import { ShareListComponent } from './cpts/share.component';
import { NowListComponent } from './cpts/friendnow.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		MyCircleComponent,
		NowListComponent,
		CommentListComponent,
		ShareListComponent,
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class MyCircleModule { }
