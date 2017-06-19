import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from "./user.component";
import {SigninComponent} from './signin/signin.component';
import {RecoverComponent} from './recover/recover.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgbModule
    ],
    declarations: [UserComponent, SigninComponent, RecoverComponent]
})
export class UserModule {
}
