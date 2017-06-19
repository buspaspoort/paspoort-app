import {Series} from "./series";
import {Priority} from "./enumerations/priority";
import {MgmtStatus} from "./enumerations/mgmt-status";
import {TechStatus} from "./enumerations/tech-status";

export class Bus {
    public id: Number;
    public busNr: Number;
    public seriesID: Number;
    public serviceDate: Date;
    public techStatus: TechStatus;
    public mgmtStatus: MgmtStatus;
    public priority: Priority;
}