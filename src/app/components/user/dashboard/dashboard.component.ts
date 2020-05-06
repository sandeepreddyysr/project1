import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userData: any = {
    name: '',
    isAdmin: false
  };

  constructor(private _storage: StorageService) { }

  ngOnInit(): void {
    let data = this._storage.getStorageItem('loggedUser', 'local');
    console.log(data);
    if(data) {
      this.userData.name = data.name;
      this.userData.isAdmin = data.isAdmin;
    }
  }

}
