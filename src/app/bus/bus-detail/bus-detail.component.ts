import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../shared/services/storage.service";
import {Bus} from "../../shared/models/bus";
import {NameAliases} from "../../shared/models/enumerations/name";
import {CommunicationService} from "../../shared/services/communication.service";
import * as moment from "moment";
import {Series} from "../../shared/models/series";
import {Report} from "../../shared/models/report";
import {TechStatus} from "../../shared/models/enumerations/tech-status";
import {MgmtStatus} from "../../shared/models/enumerations/mgmt-status";
import {Priority} from "../../shared/models/enumerations/priority";

@Component({
    selector: 'app-bus-detail',
    templateUrl: 'bus-detail.component.html',
    styleUrls: ['bus-detail.component.scss']
})
export class BusDetailComponent implements OnInit {
    private busses: Array<Bus>;
    private series: Series;
    private selectedBus: Bus;
    private nameAliases = NameAliases;
    private serviceDayFormatted: String;
    private reports: Array<Report>;
    private openReports: Array<any>;
    private moment = moment;
    private techStatus = TechStatus;
    private mgmtStatus = MgmtStatus;
    private priority = Priority;

    constructor(private route: ActivatedRoute, private storage: StorageService, private comms: CommunicationService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.comms.changeBusDetail(params["id"]);

            if (this.storage.selectedBus && this.storage.selectedBus.id === Number(params["id"])) {
                this.selectedBus = this.storage.selectedBus;
                this.serviceDayFormatted = moment(this.selectedBus.serviceDate).format("DD/MM/YYYY");

                this.storage.getSeriesByID(this.selectedBus.seriesID).then(series => this.series = series);

                this.getSyncReports();
            } else {
                this.storage.getAllBusses().then(busses => {
                    this.busses = busses;

                    for(let bus of this.busses) {
                        if (bus.id === Number(params["id"])) {
                            this.selectedBus = bus;
                            this.storage.selectedBus = bus;
                            break;
                        }
                    }

                    this.storage.getSeriesByID(this.selectedBus.seriesID).then(series => this.series = series);

                    this.serviceDayFormatted = moment(this.selectedBus.serviceDate).format("DD/MM/YYYY");

                    this.getSyncReports();
                });
            }
        })
    }

    private getSyncReports() {
        this.storage.getSyncReportsByBusID(this.selectedBus.id)
            .then(reports => this.reports = reports)
            .catch(err => console.log(err));

        this.storage.getReportsByBusID(this.selectedBus.id)
            .then(reports => {
                this.openReports = reports
            })
            .catch(err => console.log(err));
    }
}
