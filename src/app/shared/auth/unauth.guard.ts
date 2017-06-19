import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class UnauthGuard {

    constructor(private af: AngularFire, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.af.auth.map((auth) =>  {
            if(auth == null) {
                return true;
            } else {
                this.router.navigate(['bus']);
                return false;
            }
        }).first()
    }

}
