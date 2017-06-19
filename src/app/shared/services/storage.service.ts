import {Injectable} from '@angular/core';
import {Bus} from "../models/bus";
import {BusPassportDB} from "./BusPassportDB"
import {Report} from "../models/report";
import {Series} from "../models/series";

@Injectable()
export class StorageService {
    public selectedBus: Bus;
    private db;

    constructor() {
        this.reconnect();
    }

    public reconnect() {
        this.db = new BusPassportDB();
    }

    public purgeDB() {
        return this.db.delete();
    }

    public updateBusById(id, updates) {
        return this.db.busses.update(id, updates);
    }

    public replaceTempReport(report, id) {
        report.reportId = id;
        report.mgmtStatus = 0;
        report.techStatus = 0;
        let reportId = report.id;
        delete report.id;
        this.addReport(report).then(data => console.log("ok", data)).catch(err => console.log("err", err));
        this.removeSyncReport(reportId).then(data => console.log("ok", data)).catch(err => console.log("err", err));
    }

    public removeSyncReport(id) {
        return this.db.syncReports.delete(id);
    }

    public addReport(report) {
        return this.db.reports.put(report);
    }

    public addReports(reports: Array<Report>) {
        return this.db.reports.bulkPut(reports);
    }

    public addBusses(busses: Array<Bus>) {
        return this.db.busses.bulkPut(busses);
    }

    public getAllBusses() {
        return this.db.busses.toArray();
    }

    public getBusByID(busID: Number) {
        return this.db.busses.get(busID);
    }

    public addSeries(series: Array<Series>) {
        return this.db.series.bulkPut(series);
    }

    public getSeriesByID(id: Number) {
        return this.db.series.get(id);
    }

    public addTempReport(report: Report) {
        return this.db.tempReports.put(report);
    }

    public deleteTempReportByBusID(busID: Number) {
        return this.db.tempReports.where("busId").equals(busID).delete();
    }

    public getReportByBusID(busID: Number) {
        return this.db.reports.where("busId").equals(busID);
    }

    public getTempReportByBusID(busID: Number) {
        return this.db.tempReports.where("busId").equals(busID);
    }

    public addSyncReport(report: Report) {
        return this.db.syncReports.put(report);
    }

    public getReportsByBusID(busID: Number) {
        return this.db.reports.where("busId").equals(busID).sortBy("priority");
    }

    public getSyncReportsByBusID(busID: Number) {
        return this.db.syncReports.where("busId").equals(busID).sortBy("priority");
    }

    public getReportByID(id: Number) {
        return this.db.reports.get(id);
    }

    public getSyncReportByID(id: Number) {
        return this.db.syncReports.get(id);
    }

    public getAllSyncReports() {
        return this.db.syncReports.orderBy("priority").toArray();
    }
}