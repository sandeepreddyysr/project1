import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ApiServiceService } from './api-service.service';
import { Observable } from 'rxjs';

const APIURL = environment.API;

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  public user: any;
  public accessToken: any;
  public token: any;
  constructor(
    public api: ApiServiceService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const loginUrl = APIURL + 'login';
    const createPost = APIURL + 'create';

    if (req.url != loginUrl && req.url != createPost) {

      this.token = this.api.getToken();

      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': "Bearer " + this.token
        })
      });

      console.log(authReq, 'HEADERS SETTING');

      return next.handle(authReq);
    }
    else
      return next.handle(req)


  }
}
