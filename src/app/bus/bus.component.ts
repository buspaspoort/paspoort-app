import {Component, OnInit} from '@angular/core';
import {Series} from "../shared/models/series";
import {Name} from "../shared/models/enumerations/name";
import {Bus} from "../shared/models/bus";
import {MgmtStatus} from "../shared/models/enumerations/mgmt-status";
import {TechStatus} from "../shared/models/enumerations/tech-status";
import {Priority} from "../shared/models/enumerations/priority";
import {StorageService} from "../shared/services/storage.service";
import {CommunicationService} from "../shared/services/communication.service";

@Component({
    selector: 'app-bus',
    templateUrl: 'bus.component.html',
    styleUrls: ['bus.component.scss']
})
export class BusComponent implements OnInit {
    public busses: Array<Bus>;

    constructor(private storage: StorageService, private comms: CommunicationService) {
    }

    ngOnInit() {
        this.comms.changeActiveComponent("bus");
        this.storage.getAllBusses().then(busses => this.busses = busses);
    }

}
