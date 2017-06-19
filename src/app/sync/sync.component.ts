import {Component, OnInit} from '@angular/core';
import {CommunicationService} from "../shared/services/communication.service";
import {StorageService} from "../shared/services/storage.service";
import {Bus} from "../shared/models/bus";
import {MgmtStatus} from "../shared/models/enumerations/mgmt-status";
import {TechStatus} from "../shared/models/enumerations/tech-status";
import {Priority} from "../shared/models/enumerations/priority";
import {Series} from "../shared/models/series";
import {Name} from "../shared/models/enumerations/name";
import {Report} from "../shared/models/report";
import * as moment from "moment";
import {ApiService} from "../shared/services/api.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
    selector: 'app-sync',
    templateUrl: './sync.component.html',
    styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit {
    private reports: Array<Report>;
    private moment = moment;
    private priority = Priority;
    private syncButtonMessage: String = "Synchroniseer";
    private isSyncing: Boolean = false;
    private hasSynced: Boolean = false;
    private steps: number = 0;
    private step: number = 0;
    private reportsList: Array<any> = [];

    constructor(private comms: CommunicationService, private storage: StorageService, private api: ApiService, private auth: AuthService) {
        // this.auth.token.then(token => console.log(token));

        // localStorage.removeItem("needsFullSync");
    }

    ngOnInit() {
        this.comms.changeActiveComponent("sync");

        this.storage.getAllSyncReports().then(reports => this.reports = reports);
    }

    private sendSyncReports(reports) {
        this.step++;
        this.syncButtonMessage = "Stap " + this.step + "/" + this.steps;

        if (reports.length > 0) {
            let report = reports[reports.length - 1];

            this.api.sendReport(report).subscribe((reportId) => {
                this.storage.replaceTempReport(report, reportId);
                reports.pop();
                this.sendSyncReports(reports);
            });
        } else {
            this.reports = [];
            this.syncButtonMessage = "Synchroniseer";
            this.isSyncing = false;
            this.hasSynced = true;
        }
    }

    private importUpdates() {
        let needsFullSync = localStorage.getItem("needsFullSync");

        if (needsFullSync === "true" || needsFullSync === null) {
            this.api.importAll().subscribe((data) => {
                this.steps += data.reports + data.series.length;
                this.syncButtonMessage = "Stap " + this.step + "/" + this.steps;

                localStorage.setItem("needsFullSync", "false");
                localStorage.setItem("date", data.date);

                let busses: Array<Bus> = [];
                let series: Array<Series> = [];

                for (let dataBus of data.busses) {
                    let bus = new Bus();
                    bus.id = dataBus.busId;
                    bus.busNr = dataBus.busNr;
                    bus.serviceDate = dataBus.serviceDate;
                    bus.seriesID = dataBus.seriesId;
                    bus.mgmtStatus = dataBus.mgmtStatus;
                    bus.techStatus = dataBus.techStatus;
                    bus.priority = dataBus.priority;

                    if (dataBus.reports.length > 0) this.saveReports(dataBus.reports, []);
                    else {
                        this.storage.getAllSyncReports().then(reports => {
                            this.steps += reports.length;
                            this.sendSyncReports(reports)
                        });
                    }

                    busses.push(bus);
                }

                this.storage.addBusses(busses).catch(err => console.error(err.message));

                for(let dataSeries of data.series) {
                    this.step++;
                    this.syncButtonMessage = "Stap " + this.step + "/" + this.steps;

                    let serie = new Series;
                    serie.id = dataSeries.seriesId;
                    serie.brand = dataSeries.manufacturer;
                    serie.type = dataSeries.type;
                    serie.cameras = true;
                    serie.lowFloor = true;
                    serie.name = dataSeries.name;
                    serie.weelchair = true;

                    series.push(serie)
                }

                this.storage.addSeries(series).catch(err => console.log(err));
            });
        } else {
            this.api.updateRegion(localStorage.getItem("date")).subscribe((data) => {
                localStorage.setItem("date", data.date);
                this.storage.getAllSyncReports().then(reports => {
                    this.steps += reports.length;
                    this.sendSyncReports(reports)
                });
            })
        }
    }

    private saveReports(reports, reportsList) {
        if (reports.length > 0) {
            this.step++;
            this.syncButtonMessage = "Stap " + this.step + "/" + this.steps;

            let dataReport = reports[reports.length - 1];
            let report = new Report();
            report.reportId = dataReport.reportId;
            report.busId = dataReport.busId;
            report.busNr = dataReport.busNr;
            report.date = dataReport.date;
            report.observerID = dataReport.observerID;
            report.observerName = dataReport.observerName;
            report.shortDescription = dataReport.shortDescription;
            report.description = dataReport.description;
            report.priority = dataReport.priority;
            report.mgmtStatus = dataReport.mgmtStatus;
            report.techStatus = dataReport.techStatus;
            report.damageMarker = dataReport.damageMarker;

            this.api.getPhotos(report.reportId).subscribe(photos => {
                report.detailPhoto = photos.detail;
                report.contextPhoto = photos.context;

                reportsList.push(report);
                // this.reportsList.push(report);
                reports.pop();
                this.saveReports(reports, reportsList);
            });
        } else {
            if (reportsList.length > 0) {
                this.storage.addReports(reportsList).catch(err => console.error(err.message));

                this.storage.getAllSyncReports().then(reports => {
                    this.steps += reports.length;
                    this.sendSyncReports(reports)
                });
            }
        }
    }

    private syncOnline() {
        this.steps = 1;
        this.step = 1;
        this.syncButtonMessage = "Stap " + this.step + "/" + this.steps;
        this.isSyncing = true;

        this.importUpdates();
    }

    private processData(busses, series) {

    }
}
