import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import {UserModule} from "./user/user.module";
import {AuthGuard} from "./shared/auth/auth.guard";
import {UnauthGuard} from "./shared/auth/unauth.guard";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "./shared/services/auth.service";
import {BusModule} from "./bus/bus.module";
import {SharedModule} from "./shared/shared.module";
import {StorageService} from "./shared/services/storage.service";
import {CommunicationService} from "./shared/services/communication.service";
import {SyncModule} from "./sync/sync.module";
import {SettingsModule} from "./settings/settings.module";
import {CommonModule} from "@angular/common";
import {ApiService} from "./shared/services/api.service";
import {ContractService} from "./shared/services/contract.service";

export const firebaseConfig = {
    apiKey: "AIzaSyB1vJdthZ-OFTHHffibIVoTvK7-Sfx80_M",
    authDomain: "buspaspoort-7d49d.firebaseapp.com",
    databaseURL: "https://buspaspoort-7d49d.firebaseio.com",
    storageBucket: "buspaspoort-7d49d.appspot.com",
    messagingSenderId: "77656408932"

};

export const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
        NgbModule.forRoot(),
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        UserModule,
        BusModule,
        SharedModule,
        SyncModule,
        SettingsModule
    ],
    providers: [AuthGuard, UnauthGuard, AuthService, StorageService, CommunicationService, ApiService, ContractService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
