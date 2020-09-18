import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CarouselSensePipe, DelSensePipe, SenseSharedKeySearchPipe } from './sense.pipe';
import { PageRoutes } from './details.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './details.component';
import { CommentListComponent } from './cpts/comment.component';
import { GiveListComponent } from './cpts/give.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		DetailsComponent,
		CommentListComponent,
		GiveListComponent,
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class DetailsModule { }
