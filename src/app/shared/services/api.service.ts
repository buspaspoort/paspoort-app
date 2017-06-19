import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Http, Headers, Response} from "@angular/http";
import {ContractService} from "./contract.service";

@Injectable()
export class ApiService {
    private actionUrl: string;
    private headers: Headers;

    constructor(private auth: AuthService, private _http: Http, private _contract: ContractService) {
        if (location.hostname === "localhost") this.actionUrl = "http://localhost:3000/";
        else this.actionUrl = "https://buspaspoort-api.azurewebsites.net/";
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    private static handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'server error...');
    }

    public getPhotos(reportId) {
        let tokenPromise = new Promise<any>((resolve, reject) => {
            this.auth.token.then(token => {
                this.headers.set('Firebase-ID-Token', token);

                return this._http.get(
                    this.actionUrl + "getReportPhotos/" + reportId,
                    {headers: this.headers})
                    .map(res => res.json())
                    .catch(ApiService.handleError)
                    .subscribe(
                        data => resolve(data),
                        err => reject(err)
                    );
            })
        });

        return Observable.fromPromise(tokenPromise);
    }

    public sendReport(report) {
        let tokenPromise = new Promise<any>((resolve, reject) => {
            this.auth.token.then(token => {
                this.headers.set('Firebase-ID-Token', token);

                return this._http.post(
                    this.actionUrl + "insertReport/",
                    {report},
                    {headers: this.headers})
                    .map(res => res.json())
                    .catch(ApiService.handleError)
                    .subscribe(
                        data => resolve(data),
                        err => reject(err)
                    );
            })
        });

        return Observable.fromPromise(tokenPromise);
    }

    public importAll(): Observable<any> {
        let tokenPromise = new Promise<any>((resolve, reject) => {
            this.auth.token.then(token => {
                this.headers.set('Firebase-ID-Token', token);

                return this._http.get(
                    this.actionUrl + "importRegion/1",
                    {headers: this.headers})
                    .map(res => res.json())
                    .catch(ApiService.handleError)
                    .subscribe(
                        data => resolve(data),
                        err => reject(err)
                    );
            })
        });

        return Observable.fromPromise(tokenPromise);
    }


    public updateRegion(date): Observable<any> {
        let tokenPromise = new Promise<any>((resolve, reject) => {
            this.auth.token.then(token => {
                this.headers.set('Firebase-ID-Token', token);

                return this._http.post(
                    this.actionUrl + "updateRegion/1",
                    {date: date},
                    {headers: this.headers})
                    .map(res => res.json())
                    .catch(ApiService.handleError)
                    .subscribe(
                        data => resolve(data),
                        err => reject(err)
                    );
            })
        });

        return Observable.fromPromise(tokenPromise);
    }
}
