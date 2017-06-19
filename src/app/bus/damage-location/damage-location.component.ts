import {Component, OnInit, Input} from '@angular/core';
import {CommunicationService} from "../../shared/services/communication.service";
import {DamageCoordinate} from "../../shared/models/damageCoordinates";

@Component({
    selector: 'app-damage-location',
    templateUrl: './damage-location.component.html',
    styleUrls: ['./damage-location.component.scss']
})
export class DamageLocationComponent implements OnInit {
    private xPercent: number;
    private xPercentStart: number;
    private yPercent: number;
    private yPercentStart: number;
    private startX: number;
    private startY: number;
    private markerWidth: number;
    private markerHeight: number;
    private isMoving: Boolean = false;
    private isVisible: Boolean = false;
    private observable;

    constructor(private comms: CommunicationService) {
    }

    ngOnInit() {
        this.observable = this.comms.damageMarkerLoaded$.subscribe(coord => {
            let coordObj = JSON.parse(coord);

            this.markerHeight = coordObj["height"];
            this.markerWidth = coordObj["width"];
            this.xPercentStart = coordObj["xPercent"];
            this.yPercentStart = coordObj["yPercent"];

            this.isVisible = true;
        });
    }

    ngOnDestroy() {
        this.markerHeight = null;
        this.markerWidth = null;
        this.xPercentStart = null;
        this.yPercentStart = null;

        this.observable.unsubscribe();
    }

    private startTouch(event) {
        if (event.touches.length <= 1) {
            let readyEvent = this.emulateOffsetEvent(event);

            this.start(readyEvent);
        }
    }

    private emulateOffsetEvent(event) {
        let emulatedEvent = event.changedTouches[0];

        let rect = event.target.getBoundingClientRect();
        let x: number = emulatedEvent.pageX - rect.left;
        let y: number = emulatedEvent.pageY - rect.top - window.pageYOffset;

        emulatedEvent.offsetX = x;
        emulatedEvent.offsetY = y;

        return emulatedEvent;
    }

    private start(event) {
        this.isVisible = true;
        this.isMoving = true;
        this.markerWidth = 0;
        this.markerHeight = 0;
        this.xPercent = event.offsetX / event.target.width;
        this.yPercent = event.offsetY / event.target.height;
        this.startX = event.offsetX;
        this.startY = event.offsetY;

        this.xPercentStart = this.xPercent;
        this.yPercentStart = this.yPercent;
    }

    private stop(event) {
        this.isMoving = false;
        this.markerWidth = Math.abs(((event.offsetX / event.target.width) - this.xPercent) * 100);
        this.markerHeight = Math.abs(((event.offsetY / event.target.height) - this.yPercent) * 100);

        let damageCoordinate = new DamageCoordinate();
        damageCoordinate.side = "r";
        damageCoordinate.height = this.markerHeight;
        damageCoordinate.width = this.markerWidth;
        damageCoordinate.xPercent = this.xPercentStart;
        damageCoordinate.yPercent = this.yPercentStart;

        this.comms.damageMarkerAdded(damageCoordinate);
    }

    private stopTouch(event) {
        if (event.changedTouches[0]) {
            let readyEvent = this.emulateOffsetEvent(event);

            this.stop(readyEvent);
        }
    }

    private move(event) {
        if (this.isMoving) {
            this.markerWidth = Math.abs(((event.offsetX / event.target.width) - this.xPercent) * 100);
            this.markerHeight = Math.abs(((event.offsetY / event.target.height) - this.yPercent) * 100);

            if (this.startX > event.offsetX) this.xPercentStart = event.offsetX / event.target.width;
            if (this.startY > event.offsetY) this.yPercentStart = event.offsetY / event.target.height;
        }
    }

    private moveTouch(event) {
        if (this.isMoving) {
            if (event.touches.length <= 1) {
                event.preventDefault();

                let readyEvent = this.emulateOffsetEvent(event);

                this.move(readyEvent);
            }
        }
    }

    private expand() {

    }
}
