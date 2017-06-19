import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {DamageCoordinate} from "../models/damageCoordinates";

@Injectable()
export class CommunicationService {
    private activeComponentChangedSource = new Subject<String>();
    activeComponentChanged$ = this.activeComponentChangedSource.asObservable();

    private selectedBusChangedSource = new Subject<Number>();
    selectedBusChanged$ = this.selectedBusChangedSource.asObservable();

    private emailAddressChangedSource = new Subject<String>();
    emailAdrdessChanged$ = this.emailAddressChangedSource.asObservable();

    private nameChangedSource = new Subject<String>();
    nameChanged$ = this.nameChangedSource.asObservable();

    private damageMarkerAddedSource = new Subject<DamageCoordinate>();
    damageMarkerAdded$ = this.damageMarkerAddedSource.asObservable();

    private damageMarkerLoadedSource = new Subject<string>();
    damageMarkerLoaded$ = this.damageMarkerLoadedSource.asObservable();

    constructor() {
    }

    changeActiveComponent(componentName: String) {
        this.activeComponentChangedSource.next(componentName);
    }

    changeBusDetail(busId: Number) {
        this.selectedBusChangedSource.next(busId);
    }

    changeEmailAddress(emailAddress: String) {
        this.emailAddressChangedSource.next(emailAddress);
    }

    changeName(name: String) {
        this.nameChangedSource.next(name);
    }

    damageMarkerAdded(markerCoordinates: DamageCoordinate) {
        this.damageMarkerAddedSource.next(markerCoordinates);
    }

    damageMarkerLoaded(markerCoordinates: string) {
        this.damageMarkerLoadedSource.next(markerCoordinates);
    }
}
