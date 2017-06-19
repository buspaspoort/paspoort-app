import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../shared/services/validation.service";
import {Router} from "@angular/router";
import {AngularFire} from "angularfire2";
import {FirebaseAuthErrorTranslator} from "../../shared/helpers/firebase-auth-error-translator";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    private signInForm: FormGroup;
    private signInErrorMessage: String;
    private isLoading: Boolean = false;

    constructor(private fb: FormBuilder, private router: Router, private af: AngularFire) {
        this.signInForm = fb.group({
            "email": ["", [Validators.required, ValidationService.mailFormat]],
            "password": ["", [Validators.required]]
        });
    }

    ngOnInit() {
    }

    onSubmit(formData) {
        if (formData.valid) {
            this.isLoading = true;
            this.af.auth.login({
                email: formData.value.email,
                password: formData.value.password
            }).then((success) => {
                this.isLoading = false;
                this.router.navigate(['bus']);
            }).catch((err) => {
                this.isLoading = false;

                this.signInErrorMessage = FirebaseAuthErrorTranslator.ErrorToMessage(err);
            })
        }
    }
}
