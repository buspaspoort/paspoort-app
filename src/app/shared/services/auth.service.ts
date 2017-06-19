import {Injectable} from '@angular/core';
import {FirebaseAuthState, AngularFire} from "angularfire2";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
    public authState: FirebaseAuthState = null;

    constructor(private af: AngularFire, private router: Router) {
        this.af.auth.subscribe((state: FirebaseAuthState) => {
            this.authState = state;

            if (!state) {
                this.router.navigate(["/user", "signin"]);
            }
        })
    }

    authChanged = this.af.auth;

    authenticated(): boolean {
        return this.authState !== null;
    }

    uid(): string {
        return this.authenticated ? this.authState.uid : null;
    }

    get token(): firebase.Promise<string> {
        if (this.authState)
            return this.authState.auth.getToken();
        else
            return new Promise((resolve, reject) => {
                reject("Not authenticated")
            });
    }

    signOut() {
        this.af.auth.logout().then(() => this.router.navigate(["/user", "signin"]));
    }
}
