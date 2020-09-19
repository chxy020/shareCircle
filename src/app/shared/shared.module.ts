import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from './loading';
import { FormatTimePipe, ImageLazyLoadPipe } from './pipes/datafilter.pipe';
import { DropLoadModule } from './directives/dropload/dropload.module';


@NgModule({
    declarations: [
        FormatTimePipe,
        ImageLazyLoadPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoadingModule,
        DropLoadModule
    ],
    providers: [

    ],
    exports: [
        CommonModule,
        FormsModule,
        
        FormatTimePipe,
        ImageLazyLoadPipe,

        LoadingModule,
        DropLoadModule
    ]
})
export class SharedModule {
}
