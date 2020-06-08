import { Component, OnInit } from '@angular/core';
import { StorageService } from './storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-demo';

  constructor(private _storage: StorageService, private router: Router,) { }

  ngOnInit() {

    /* const user = {
      "id": '20349jukjsjf3o9',
      "name": "test",
      "isAdmin": true,
      "token": "klsjkldfu29238409238490"
    }

    this._storage.setStorageItem('loggedUser', user, 'local'); */

  	if(this._storage.getStorageItem('loggedUser', 'local')) {
  		this.router.navigate(['/user/dashboard']);
  	}
  	else {
  		this.router.navigate(['/authentication/login']);
  	}

  }
}
