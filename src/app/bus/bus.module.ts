import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusComponent} from "./bus.component";
import {BusNavigationComponent} from './bus-navigation/bus-navigation.component';
import {RouterModule} from "@angular/router";
import {NoneComponent} from './none/none.component';
import {BusDetailComponent} from "./bus-detail/bus-detail.component";
import {BusFilterPipe} from "../shared/pipes/bus-filter.pipe";
import {SharedModule} from "../shared/shared.module";
import {NewReportComponent} from './new-report/new-report.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { DamageLocationComponent } from './damage-location/damage-location.component';
import { OpenReportComponent } from './open-report/open-report.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [
        BusComponent,
        BusNavigationComponent,
        NoneComponent,
        BusDetailComponent,
        BusFilterPipe,
        NewReportComponent,
        DamageLocationComponent,
        OpenReportComponent
    ]
})
export class BusModule {
}
