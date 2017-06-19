import {Component, OnInit, Inject} from '@angular/core';
import {CommunicationService} from "../../shared/services/communication.service";
import {FirebaseApp} from "angularfire2";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {ValidationService} from "../../shared/services/validation.service";
import {FirebaseAuthErrorTranslator} from "../../shared/helpers/firebase-auth-error-translator";
import {AuthService} from "../../shared/services/auth.service";
import AuthCredential = firebase.auth.AuthCredential;
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import * as firebase from 'firebase';

@Component({
    selector: 'app-settings-account',
    templateUrl: './settings-account.component.html',
    styleUrls: ['./settings-account.component.scss']
})
export class SettingsAccountComponent implements OnInit {
    private authApp: any;
    private updatePasswordForm: FormGroup;
    private updateEmailForm: FormGroup;
    private updateEmailMessage: String;
    private updatePasswordMessage: String;
    private updatePasswordSuccessMessage: String;
    private updateEmailSuccessMessage: String;
    private isPasswordLoading: Boolean = false;
    private isEmailLoading: Boolean = false;
    private email: String;

    constructor(private auth: AuthService, private comms: CommunicationService, @Inject(FirebaseApp) firebaseApp: firebase.app.App, private fb: FormBuilder) {
        this.authApp = firebaseApp.auth();

        this.updatePasswordForm = fb.group({
            password: new FormControl("", Validators.required),
            newPassword: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6)])),
            newPasswordRepeat: new FormControl("", Validators.required)
        }, {validator: ValidationService.matchingPasswords('newPassword', 'newPasswordRepeat')});

        this.updateEmailForm = fb.group({
            password: new FormControl("", Validators.required),
            email: new FormControl("", Validators.compose([Validators.required, ValidationService.mailFormat]))
        })
    }

    ngOnInit() {
        this.comms.changeActiveComponent("account");

        this.email = this.auth.authState.auth.email;
        this.comms.emailAdrdessChanged$.subscribe(emailAddress => this.email = emailAddress);
    }

    private tryUpdateEmail(formData) {
        if (formData.valid) {
            this.isEmailLoading = true;

            let credentials: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.auth.authState.auth.email, formData.value.password);

            this.authApp.currentUser.reauthenticate(credentials).then((success) => {
                this.authApp.currentUser.updateEmail(formData.value.email).then((success) => {
                    this.isEmailLoading = false;

                    this.updateEmailSuccessMessage = "Uw email adres werd succesvol gewijzigd.";
                    this.updateEmailMessage = null;

                    this.comms.changeEmailAddress(formData.value.email);
                }).catch((err) => {
                    this.isEmailLoading = false;

                    this.updateEmailMessage = FirebaseAuthErrorTranslator.ErrorToMessage(err);
                });
            }).catch((err) => {
                this.isEmailLoading = false;

                this.updateEmailMessage = FirebaseAuthErrorTranslator.ErrorToMessage(err);
            });
        }
    }

    private tryUpdatePassword(formData) {
        if (formData.valid) {
            this.isPasswordLoading = true;

            let credentials: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.auth.authState.auth.email, formData.value.password);

            this.authApp.currentUser.reauthenticate(credentials).then((success) => {
                this.authApp.currentUser.updatePassword(formData.value.newPassword).then((success) => {
                    this.isPasswordLoading = false;

                    this.updatePasswordSuccessMessage = "Uw wachtwoord werd succesvol gewijzigd.";
                    this.updatePasswordMessage = null;
                }).catch((err) => {
                    this.isPasswordLoading = false;

                    this.updatePasswordMessage = FirebaseAuthErrorTranslator.ErrorToMessage(err);
                });
            }).catch((err) => {
                this.isPasswordLoading = false;

                this.updatePasswordMessage = FirebaseAuthErrorTranslator.ErrorToMessage(err);
            });
        }
    }
}
