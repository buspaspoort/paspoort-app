import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CommunicationService} from "../../services/communication.service";
import {Subscription} from "rxjs";
@Component({
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss']
})
export class NavigationComponent implements OnInit {
    private email: String;
    private component: String;
    private subscription: Subscription;
    private name: String;

    constructor(private auth: AuthService, private comms: CommunicationService) {
        this.subscription = this.comms.activeComponentChanged$.subscribe(componentName => {
            this.component = componentName
        });
    }

    ngOnInit() {
        this.email = this.auth.authState.auth.email;
        this.name = this.auth.authState.auth.displayName;
        this.comms.emailAdrdessChanged$.subscribe(emailAddress => this.email = emailAddress);
        this.comms.nameChanged$.subscribe(name => this.name = name);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private signOut() {
        this.auth.signOut();
    }
}
