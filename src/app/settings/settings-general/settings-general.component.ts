import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StorageService} from "../../shared/services/storage.service";
import {CommunicationService} from "../../shared/services/communication.service";

@Component({
    selector: 'app-settings-general',
    templateUrl: './settings-general.component.html',
    styleUrls: ['./settings-general.component.scss']
})
export class SettingsGeneralComponent implements OnInit {
    private isPurged: Boolean = false;

    constructor(private modalService: NgbModal, private storage: StorageService, private comms: CommunicationService) {
    }

    ngOnInit() {
        this.comms.changeActiveComponent("general");
    }

    private open(content) {
        this.modalService.open(content).result.then((result) => {
            localStorage.removeItem("needsFullSync");
            localStorage.removeItem("date");
            this.storage.purgeDB().then(() => {
                this.isPurged = true;
                this.storage.reconnect();
            });
        }, (reason) => {});
    }
}
