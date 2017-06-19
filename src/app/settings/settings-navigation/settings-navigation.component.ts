import {Component, OnInit} from '@angular/core';
import {CommunicationService} from "../../shared/services/communication.service";

@Component({
    selector: 'app-settings-navigation',
    templateUrl: './settings-navigation.component.html',
    styleUrls: ['./settings-navigation.component.scss']
})
export class SettingsNavigationComponent implements OnInit {
    private component: String;

    constructor(private comms: CommunicationService) {
        this.comms.activeComponentChanged$.subscribe(componentName => {
            this.component = componentName
        });
    }

    ngOnInit() {
    }

}
