import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsNavigationComponent} from './settings-navigation/settings-navigation.component';
import {SharedModule} from "../shared/shared.module";
import {SettingsComponent} from "./settings.component";
import {RouterModule} from "@angular/router";
import {SettingsProfileComponent} from './settings-profile/settings-profile.component';
import {SettingsAccountComponent} from './settings-account/settings-account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { SettingsGeneralComponent } from './settings-general/settings-general.component';

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
        SettingsNavigationComponent,
        SettingsComponent,
        SettingsProfileComponent,
        SettingsAccountComponent,
        SettingsGeneralComponent
    ]
})
export class SettingsModule {
}
