import {Component, OnInit, Input} from '@angular/core';
import {Bus} from "../../shared/models/bus";
import {TechStatus} from "../../shared/models/enumerations/tech-status";
import {Priority} from "../../shared/models/enumerations/priority";
import {MgmtStatus} from "../../shared/models/enumerations/mgmt-status";
import {StorageService} from "../../shared/services/storage.service";
import {CommunicationService} from "../../shared/services/communication.service";

@Component({
    selector: 'app-bus-navigation',
    templateUrl: 'bus-navigation.component.html',
    styleUrls: ['bus-navigation.component.scss']
})
export class BusNavigationComponent implements OnInit {
    @Input() busses: Array<Bus>;
    private techStatus = TechStatus;
    private mgmtStatus = MgmtStatus;
    private priority = Priority;
    private selectedBusId: Number;

    constructor(private storage: StorageService, private comms: CommunicationService) {
        comms.selectedBusChanged$.subscribe(busId => {
            this.selectedBusId = Number(busId);
        });
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

    private storeSelectedBus(id: Number) {
        for(let bus of this.busses) {
            if (bus.id === id) {
                this.storage.selectedBus = bus;
                break;
            }
        }
    }
}
