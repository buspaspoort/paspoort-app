import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "./shared/auth/auth.guard";
import {UserComponent} from "./user/user.component";
import {UnauthGuard} from "./shared/auth/unauth.guard";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {SigninComponent} from "./user/signin/signin.component";
import {RecoverComponent} from "./user/recover/recover.component";
import {BusComponent} from "./bus/bus.component";
import {NoneComponent} from "./bus/none/none.component";
import {BusDetailComponent} from "./bus/bus-detail/bus-detail.component";
import {SyncComponent} from "./sync/sync.component";
import {NewReportComponent} from "./bus/new-report/new-report.component";
import {SettingsComponent} from "./settings/settings.component";
import {SettingsProfileComponent} from "./settings/settings-profile/settings-profile.component";
import {SettingsAccountComponent} from "./settings/settings-account/settings-account.component";
import {SettingsGeneralComponent} from "./settings/settings-general/settings-general.component";
import {OpenReportComponent} from "./bus/open-report/open-report.component";
const routes: Routes = [
    {
        path: '',
        redirectTo: 'bus',
        pathMatch: 'full'
    },
    {
        path: 'bus',
        component: BusComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: NoneComponent},
            {path: ':id/newreport', component: NewReportComponent},
            {path: ':id', component: BusDetailComponent},
            {path: ':id/sync/:reportID', component: NewReportComponent},
            {path: ':id/open/:reportID', component: OpenReportComponent}
        ]
    },
    {
        path: 'sync',
        component: SyncComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [UnauthGuard],
        children: [
            {path: 'signin', component: SigninComponent},
            {path: 'recover', component: RecoverComponent}
        ]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', redirectTo: 'profile', pathMatch: 'full'},
            {path: 'general', component: SettingsGeneralComponent},
            {path: 'profile', component: SettingsProfileComponent},
            {path: 'account', component: SettingsAccountComponent}
        ]
    },
    {path: '**', component: NotFoundComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}