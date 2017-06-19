import {Component, OnInit, Inject} from '@angular/core';
import {CommunicationService} from "../../shared/services/communication.service";
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {FirebaseApp} from "angularfire2";
import {AuthService} from "../../shared/services/auth.service";
import {FirebaseAuthErrorTranslator} from "../../shared/helpers/firebase-auth-error-translator";

@Component({
    selector: 'app-settings-profile',
    templateUrl: './settings-profile.component.html',
    styleUrls: ['./settings-profile.component.scss']
})
export class SettingsProfileComponent implements OnInit {
    private updateProfileForm: FormGroup;
    private updateRegionsForm: FormGroup;
    private isProfileLoading: Boolean = false;
    private isRegionsLoading: Boolean = false;
    private updateProfileMessage: String;
    private updateProfileSuccessMessage: String;
    private updateRegionsMessage: String;
    private selectedRegions: Object = {0: false, 1: true, 2: false};
    private authApp: any;

    constructor(private auth: AuthService, private comms: CommunicationService, private fb: FormBuilder, @Inject(FirebaseApp) firebaseApp: firebase.app.App) {
        this.authApp = firebaseApp.auth();

        let name = this.auth.authState.auth.displayName;

        this.updateProfileForm = fb.group({
            name: new FormControl(name, Validators.compose([Validators.required, Validators.maxLength(35)])),
        });

        let allCategories: FormArray = new FormArray([
            new FormControl({value: {name: "Kust", value: "0", checked: false}}),
            new FormControl({value: {name: "Brugge", value: "1", checked: true}}),
            new FormControl({value: {name: "Kortijk", value: "2", checked: false}})

        ]);

        this.updateRegionsForm = fb.group({
            regions: allCategories
        });
    }

    ngOnInit() {
        this.comms.changeActiveComponent("profile");
    }

    private tryUpdateProfile(formData) {
        if (formData.valid) {
            this.isProfileLoading = true;

            this.authApp.currentUser.updateProfile({
                displayName: formData.value.name
            }).then((success) => {
                this.isProfileLoading = false;

                this.updateProfileSuccessMessage = "Uw naam werd succesvol gewijzigd.";
                this.updateProfileMessage = null;

                this.comms.changeName(formData.value.name);
            }).catch((err) => {
                this.isProfileLoading = false;

                this.updateProfileMessage = FirebaseAuthErrorTranslator.ErrorToMessage(err);
            });
        }
    }

    private changeRegion(event) {
        this.selectedRegions[event.target.value] = event.target.checked;
    }

    private tryUpdateRegions() {
        this.isRegionsLoading = true;

        setTimeout(() => {
            this.isRegionsLoading = false;

            this.updateRegionsMessage = "Enkel region Brugge is beschikbaar."
        }, 1000);
    }
}
