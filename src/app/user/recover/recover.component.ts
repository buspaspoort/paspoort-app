import {Component, OnInit, Inject} from '@angular/core';
import {AngularFire, FirebaseApp} from "angularfire2";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {ValidationService} from "../../shared/services/validation.service";
import {Router} from "@angular/router";
import {FirebaseAuthErrorTranslator} from "../../shared/helpers/firebase-auth-error-translator";

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
    private auth: any;
    private signInForm: FormGroup;
    private isLoading: Boolean = false;
    private signInErrorMessage: String;

    constructor(private af: AngularFire, @Inject(FirebaseApp) firebaseApp: firebase.app.App, private fb: FormBuilder, private router: Router) {
        this.auth = firebaseApp.auth();

        this.signInForm = fb.group({
            "email": ["", [Validators.required, ValidationService.mailFormat]],
        });
    }

    ngOnInit() {
    }

    onSubmit(formData) {
        if (formData.valid) {
            this.isLoading = true;
            this.auth.sendPasswordResetEmail(
                formData.value.email
            ).then((success) => {
                this.isLoading = false;
                this.router.navigate(['/user', 'signin']);
            }).catch((err) => {
                this.isLoading = false;

                this.signInErrorMessage = FirebaseAuthErrorTranslator.ErrorToMessage(err);
            })
        }
    }
}
