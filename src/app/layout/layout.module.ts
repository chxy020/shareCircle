import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// layout
import { ConsoleComponent } from './console/console.component';
import { HeaderConsoleComponent } from './console/header/header.component';
import { TitleHeaderComponent } from './console/header/titleheader.component';
import { TitleBackComponent } from './console/titleback.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule
	],
	declarations: [
		HeaderConsoleComponent,
		TitleHeaderComponent,
		ConsoleComponent,
		TitleBackComponent
	],
	exports: [
		HeaderConsoleComponent,
		TitleHeaderComponent,
		ConsoleComponent,
		TitleBackComponent
	],
	providers: []
})
export class LayoutModule {
}
