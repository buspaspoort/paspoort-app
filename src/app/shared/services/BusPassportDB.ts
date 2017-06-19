import Dexie from 'dexie';

export class BusPassportDB extends Dexie {
    constructor () {
        super("BusPassportDB");
        this.version(1).stores({
            busses: 'id, busNr, seriesID, serviceDate, techStatus, mgmtStatus, priority',
            series: 'id, type, brand, weelchair, cameras, name, lowFloor',
            tempReports: '++id, busId, shortDescription, description, priority, contextPhoto, detailPhoto, damageMarker',
            syncReports: '++id, date, dateUpdated, busId, observerID, observerName, shortDescription, description, priority, contextPhoto, detailPhoto, damageMarker',
            reports: '++id, reportId, date, dateUpdated, busId, observerID, observerName, shortDescription, description, priority, contextPhoto, detailPhoto, mgmtStatus, techStatus, damageMarker'
        });
    }
}