import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../shared/services/storage.service";
import {CommunicationService} from "../../shared/services/communication.service";
import {Bus} from "../../shared/models/bus";
import * as moment from "moment";
import {Report} from "../../shared/models/report";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {Series} from "../../shared/models/series";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-new-report',
    templateUrl: './new-report.component.html',
    styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {
    private busses: Array<Bus>;
    private selectedBus: Bus;
    private newReportTimeFormatted: String;
    private report: Report;
    private newReportForm: FormGroup;
    private contextPhotoMade: Boolean = false;
    private detailPhotoMade: Boolean = false;
    private photo: String;
    private isSaved: Boolean = false;
    private formChanged: Boolean = false;
    private series: Series;
    private tempID: Number;
    private syncReportID: Number;
    private observable;

    constructor(private route: ActivatedRoute, private storage: StorageService, private comms: CommunicationService, private router: Router, private modalService: NgbModal, private auth: AuthService) {
        this.report = new Report();
        this.report.observerID = this.auth.uid();
        this.report.observerName = this.auth.authState.auth.displayName;
        this.report.date = new Date();
        this.newReportTimeFormatted = moment(this.report.date).format("DD/MM/YYYY");

        this.newReportForm = new FormGroup({
            shortDescription: new FormControl("", Validators.required),
            priority: new FormControl("2", Validators.required),
            description: new FormControl("", Validators.required)
        });
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.comms.damageMarkerAdded$.subscribe(coord => {
            this.formChanged = true;
            this.report.damageMarker = JSON.stringify(coord);
        });

        this.route.params.subscribe((params) => {
            this.comms.changeBusDetail(params["id"]);

            if (this.storage.selectedBus && this.storage.selectedBus.id === Number(params["id"])) {
                this.selectedBus = this.storage.selectedBus;
                this.report.busId = this.selectedBus.id;
                this.report.busNr = this.selectedBus.busNr;

                this.storage.getSeriesByID(this.selectedBus.seriesID).then(series => this.series = series);

                this.getTempReport();
            }
            else {
                this.storage.getAllBusses().then(busses => {
                    this.busses = busses;

                    for(let bus of this.busses) {
                        if (bus.id === Number(params["id"])) {
                            this.selectedBus = bus;
                            this.storage.selectedBus = bus;
                            break;
                        }
                    }

                    this.report.busId = this.selectedBus.id;
                    this.report.busNr = this.selectedBus.busNr;

                    this.storage.getSeriesByID(this.selectedBus.seriesID).then(series => this.series = series);

                    this.getTempReport();
                });
            }

            if (params["reportID"]) {
                this.syncReportID = Number(params["reportID"]);

                this.storage.getSyncReportByID(this.syncReportID).then(report => {
                    this.report = report;

                    this.observable = this.comms.damageMarkerLoaded(report.damageMarker);

                    this.fillInFormFromModel(this.report);
                });
            }
        });
    }

    private getTempReport() {
        this.storage.getTempReportByBusID(this.selectedBus.id).first(report => {
            if (report !== undefined) {
                this.report.damageMarker = report.damageMarker;
                this.tempID = report.id;
                this.fillInFormFromModel(report);

                this.observable = this.comms.damageMarkerLoaded(report.damageMarker);
            }
        });
    }

    private fillInFormFromModel(report: Report) {
        if (report !== undefined) {
            this.newReportForm.controls["shortDescription"].setValue(report.shortDescription);
            this.newReportForm.controls["priority"].setValue(report.priority);
            this.newReportForm.controls["description"].setValue(report.description);
            if(report.contextPhoto) {
                this.report.contextPhoto = report.contextPhoto;
                this.contextPhotoMade = true;
            }
            if(report.detailPhoto) {
                this.report.detailPhoto = report.detailPhoto;
                this.detailPhotoMade = true;
            }
        }
    }

    ngOnDestroy() {
        if(this.formChanged && !this.isSaved) {
            this.report.shortDescription = this.newReportForm.value.shortDescription;
            this.report.description = this.newReportForm.value.description;
            this.report.priority = Number(this.newReportForm.value.priority);

            if (this.tempID) this.report.id = this.tempID;
            this.storage.addTempReport(this.report).catch(err => console.log(err));
        }

        // this.observable.unsubscribe();
    }

    private open(content) {
        this.modalService.open(content).result.then((result) => {
            this.save();
        }, (reason) => {
            if (reason === "rejectClick") this.router.navigate(["/bus", this.selectedBus.id]);
        });
    }

    private save() {
        if (this.newReportForm.valid && this.report.contextPhoto && this.report.detailPhoto) {
            this.isSaved = true;
            this.storage.addSyncReport(this.report).then(data => this.router.navigate(["/bus", this.selectedBus.id])).catch(err => console.log(err));
            this.storage.updateBusById(this.report.busId, {mgmtStatus: 0, techStatus: 0}).catch(err => console.log(err));
            this.storage.deleteTempReportByBusID(this.report.busId).catch(err => console.log(err));
        }
    }

    private returnToBus(content) {
        if (!this.isSaved) this.open(content);
        else this.router.navigate(["/bus", this.selectedBus.id]);
    }

    private fileChangeContext(event) {
        this.photo = "context";
        this.fileChange(event);
    }

    private fileChangeDetail(event) {
        this.photo = "detail";
        this.fileChange(event);
    }

    private fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];

            let reader: FileReader = new FileReader();

            reader.addEventListener("load", () => {
                if (this.photo === "context") {
                    this.contextPhotoMade = true;
                    this.downscaleImage(reader.result, 1024, file.type, 0.3).then(url => {this.report.contextPhoto = url});
                    // this.report.contextPhoto = reader.result;
                }

                if (this.photo === "detail") {
                    this.detailPhotoMade = true;
                    this.downscaleImage(reader.result, 1024, file.type, 0.3).then(url => {this.report.detailPhoto = url});
                    // this.report.detailPhoto = reader.result;
                }
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }

    private downscaleImage(dataUrl, newWidth, imageType, imageArguments):Promise<string> {
        return new Promise((resolve, reject) => {
            let image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;

            imageType = imageType || "image/jpeg";
            imageArguments = imageArguments || 0.3;

            image = new Image();
            image.onload = function () {
                oldWidth = image.width;
                oldHeight = image.height;
                newHeight = Math.floor(oldHeight / oldWidth * newWidth);

                canvas = document.createElement("canvas");
                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0, newWidth, newHeight);
                newDataUrl = canvas.toDataURL(imageType, imageArguments);
                resolve(newDataUrl);
            };
            image.src = dataUrl;
        });
    }

    private sendReport(formData) {
        if (formData.valid && this.report.contextPhoto && this.report.detailPhoto) {
            this.report.shortDescription = formData.value.shortDescription;
            this.report.description = formData.value.description;
            this.report.priority = Number(formData.value.priority);

            this.save();
        }
    }
}
