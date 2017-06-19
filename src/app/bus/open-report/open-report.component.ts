import {Component, OnInit} from '@angular/core';
import {Series} from "../../shared/models/series";
import {Bus} from "../../shared/models/bus";
import {Router, ActivatedRoute} from "@angular/router";
import {StorageService} from "../../shared/services/storage.service";
import * as moment from "moment";
import {MgmtStatusAliases} from "../../shared/models/enumerations/mgmt-status";
import {TechStatusAliases} from "../../shared/models/enumerations/tech-status";
import {PriorityAliases} from "../../shared/models/enumerations/priority";
import {CommunicationService} from "../../shared/services/communication.service";

@Component({
    selector: 'app-open-report',
    templateUrl: './open-report.component.html',
    styleUrls: ['./open-report.component.scss']
})
export class OpenReportComponent implements OnInit {
    private report;
    private series: Series;
    private selectedBus: Bus;
    private busses: Array<Bus>;
    private reportID: Number;
    private newReportTimeFormatted: String;
    private mgmtAliases = MgmtStatusAliases;
    private techAliases = TechStatusAliases;
    private priorityAliases = PriorityAliases;
    private observable;

    constructor(private route: ActivatedRoute, private storage: StorageService, private comms: CommunicationService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(){
        this.route.params.subscribe((params) => {
            if (this.storage.selectedBus && this.storage.selectedBus.id === Number(params["id"])) {
                this.selectedBus = this.storage.selectedBus;

                this.storage.getSeriesByID(this.selectedBus.seriesID).then(series => this.series = series);

                // this.getReport();
            }
            else {
                this.storage.getAllBusses().then(busses => {
                    this.busses = busses;

                    for (let bus of this.busses) {
                        if (bus.id === Number(params["id"])) {
                            this.selectedBus = bus;
                            this.storage.selectedBus = bus;
                            break;
                        }
                    }

                    this.storage.getSeriesByID(this.selectedBus.seriesID).then(series => this.series = series);

                    // this.getReport();
                });
            }

            if (params["reportID"]) {
                this.reportID = Number(params["reportID"]);

                this.storage.getReportByID(this.reportID).then(report => {
                    this.report = report;
                    this.newReportTimeFormatted = moment(this.report.date).format("DD/MM/YYYY");

                    setTimeout(_=> this.observable = this.comms.damageMarkerLoaded(report.damageMarker),0);
                });
            }
        });
    }


    ngOnDestroy() {
        // this.observable.unsubscribe();
    }

    private getReport() {
        this.storage.getReportByBusID(this.selectedBus.id).first(report => {
            if (report !== undefined) {
                this.report = report;
                this.newReportTimeFormatted = moment(this.report.date).format("DD/MM/YYYY");

                console.log(report);
                this.observable = this.comms.damageMarkerLoaded(report.damageMarker);
            }
        });
    }
}
