import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {SyncComponent} from './sync.component';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [SyncComponent]
})
export class SyncModule {
}
