import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError, map } from 'rxjs/operators';

const API_URL = environment.API;

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

	private modelMapping: any = {};

    constructor(private http: HttpClient) { 

    }

	get(params): Observable<any> {

		let URL = API_URL + params.url;

		return this.http.get(URL, params.data).pipe(map(response => {
			return response;
		}),
	      catchError(err => {
	        return throwError(err)
	      })
	    );

	}


	post(params):Observable<any>{

		let headers = { 'Content-Type': 'application/json' };

		let URL = API_URL + params.url;

		return this.http.post(URL, params.data, { headers: headers }).pipe(map(response => {
			return response;
		}),
	      catchError(err => {
	        return throwError(err)
	      })
	    );
	}

	put(params): Observable<any> {

        let headers = { 'Content-Type': 'application/json' };

        let URL = API_URL + params.url;

        return this.http.put(URL, params.data, { headers: headers }).pipe(map(response => {
			return response;
		}),
	      catchError(err => {
	        return throwError(err)
	      })
	    );

    }

    delete(params): Observable<any> {

    	let URL = API_URL + params.url;

        return this.http.delete(URL, params.data).pipe(map(response => {
			return response;
		}),
	      catchError(err => {
	        return throwError(err)
	      })
	    );
    }

}
