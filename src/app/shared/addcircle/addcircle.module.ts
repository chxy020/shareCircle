import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AddCircleComponent } from './addcircle.component';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
	declarations: [
		AddCircleComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		LoadingModule
	],
	exports: [AddCircleComponent]
})

export class AddCircleModule {
	constructor() {
	}
}
